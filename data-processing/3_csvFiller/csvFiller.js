const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const ObjectsToCsv = require('objects-to-csv');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const axios = require('axios');
const parser = require('tld-extract');

const argv = yargs(hideBin(process.argv)).argv;

const { Resolver } = require('dns');
const resolver = new Resolver();

const whois = require('whois')
const util = require('util')
const lookup = util.promisify(whois.lookup);

const filePath = argv.path;
const outFilePath = argv.out;
const getters = (argv.get || []).split(',');

// get free key from https://ipgeolocation.io/
const GEO_API_KEY = '<your_key>';

const id_to_country = require('./id_to_country.js');
const id_to_tld = require('./id_to_tld.js');
const country_to_continent = require('./country_to_continent.js');

const getDomain = async (url) => {
    try {
        const parsed = parser(url);
        return parsed.sub + parsed.domain;
    } catch (e) {
        return url;
    }
}

const getIP = async (url) => {
    const website = await getDomain(url);
    if (website == url && website.includes('http')) {
        var r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
        return website.replace('http://', '').replace('https://', '').match(r)[0];
    } else {
        try {
            return new Promise((resolve) => {
                resolver.resolve4(website, { ttl: true }, (error, addresses) => {
                    addresses ? resolve(addresses[0].address) : resolve("-1");
                });
            });
        } catch (error) {
            return "-1";
        }
    }
};

const getGeo = async (ip) => {
    const request = axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${GEO_API_KEY}&ip=` + ip + '&fields=country_name');
    return request
        .then(async (result) => {
            const geoId = await getIdFromCountry(result.data.country_name);
            return geoId;
        })
        .catch(error => { return Promise.reject(error); });
};

const getIdFromCountry = async (country) => {
    return new Promise((resolve, reject) => {
        Object.entries(id_to_country).forEach(([key, value]) => {
            if (value == country) {
                resolve(key);
            }
        });
        resolve("-1");
    });
}

const getContinentFromCountry = async (country) => {
    return new Promise((resolve, reject) => {
        country_to_continent.map(item => {
            if (item.Country == country) {
                resolve(item.Continent);
            }
        });
        resolve("-1");
    });
}

const getUrlLength = async (website) => {
    return website.length;
};

const getHTML = async (website) => {
    const request = axios.get(website);
    return request
        .then(result => { return result.data; })
        .catch(error => { return "error" });
};

const getJsLength = async (website) => {
    const html = await getHTML(`http://${website}`);
    if (!!html && html !== null && typeof html === "string") {
        const jsInHTML = html.match(/<script.*?>.*?<\/script>/g);
        const jsLength = (jsInHTML != null) ? jsInHTML.toString().length : 0;
        return jsLength;
    }
    return 0;
};

const getTLD = async (url) => {
    return new Promise((resolve, reject) => {
        Object.entries(id_to_tld).forEach(([key, value]) => {
            if (url.includes(value)) {
                resolve(key);
            }
        });
        resolve("-1");
    });
}

const getWhoIs = async (url) => {
    try {
        let result = await lookup(url);
        return result.includes(url) ?
            1
            : 0;
    } catch (error) {
        return 0;
    }
};

const getIsHttps = async (website) => {
    // const html = await getHTML(`https://${website}`);
    // if (!!html && html !== null && typeof html === "string") {
    //     return 1;
    // }
    // return 0;
    return website.includes('https') ? 1 : 0;
};

const getTalosBad = async (url) => {
    try {
        const request = axios.get(`https://talosintelligence.com/cloud_intel/url_reputation?url=${url}`);
        return request
            .then(async (result) => {
                const data = result.data
                const bad = data.reputation.threat_level_mnemonic.includes('untrusted') ? '1' : '0';
                return bad;
            })
            .catch(error => { return '-1'; });
    } catch (error) {
        console.log("ERROR");
        return '-1';
    }
};

async function fillNewItem(item) {
    const ip = getters.includes('ip') || getters.includes('all') ? await getIP(item.url) : item.ip;
    const geo = (getters.includes('geo_loc') || getters.includes('all')) && ip != undefined ? ((ip.includes("127.0.0.1") || ip.includes("-1")) ? "-1" : await getGeo(ip)) : item.geo_loc || '';
    const continent = (getters.includes('continent') || getters.includes('all')) && geo != undefined ? await getContinentFromCountry(id_to_country[geo]) : item.continent || '';
    const urlLength = getters.includes('url_length') || getters.includes('all') ? await getUrlLength(item.url) : item.url_length || '';
    //const jsLength = getters.includes('js_length') || getters.includes('all') ? await getJsLength(item.url) : item.js_length || '';
    const tld = getters.includes('tld') || getters.includes('all') ? await getTLD(item.url) : item.tld || '';
    const isWhoIs = getters.includes('who_is') || getters.includes('all') ? await getWhoIs(item.url) : item.who_is || '';
    const isHttps = getters.includes('is_https') || getters.includes('all') ? await getIsHttps(item.url) : item.is_https || '';
    const bad = getters.includes('bad') || getters.includes('all') ? await getTalosBad(item.url) : item.bad || '';
    return ({
        url: item.url,
        ip: ip,
        geo_loc: geo,
        continent: continent,
        url_length: urlLength,
        //js_length: jsLength,
        tld: tld,
        who_is: isWhoIs,
        is_https: isHttps,
        bad: bad
    });
}

async function afterRead(savePath, rows) {
    let newRows = [];
    rows.map(async (item) => {
        const rowsLength = rows.length;
        const filled = await fillNewItem(item);
        let length = newRows.push(filled);
        console.log(`${savePath} in progress: ${length}/${rowsLength}`);
        if (length == rowsLength) {
            const csvObj = new ObjectsToCsv(newRows);
            await csvObj.toDisk(savePath);
            newRows = [];
            console.log(`Done with ${savePath}`);
        }
    });
}

const main = () => {
    const filesArray = fs.readdirSync(filePath).filter(file => fs.lstatSync(`${filePath}/${file}`).isFile())
    filesArray.map(file => {
        let rows = [];
        fs.createReadStream(path.resolve(__dirname, `${filePath}/${file}`))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', row => rows.push(row))
            .on('end', async () => {
                afterRead(`${outFilePath}/${file}`, rows);
            });
    })
};

if (!argv.path && !argv.out) {
    console.log('Please provide a path to a csv file with --path= and a path to an output file with --out=');
} else {
    main();
}