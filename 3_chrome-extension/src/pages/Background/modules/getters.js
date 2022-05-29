import axios from 'axios';
import { getIdFromCountry, getIdFromTLD, getTLDFromUrl, getCountryFromTLD } from './utils';
const GEO_API_KEY = localStorage.getItem('geoApiKey');

export const getNotLocallyIP = async (url) => {
    const request = axios.get(`https://talosintelligence.com/cloud_intel/domain_info?domain_name=` + url);
    return request
        .then(async (result) => {
            console.log(result.data);
            if (result.data.error.includes('Could not find domain')) {
                return null;
            }
            return result.data.related_ips[0].address;
        })
        .catch(error => { return Promise.reject(error); });
};

export const getGeo = async (ip) => {
    const request = axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${GEO_API_KEY}&ip=` + ip + '&fields=country_name,country_tld,continent_name');
    return request
        .then(async (result) => {
            const geoId = await getIdFromCountry(result.data.country_name);
            const tldId = await getIdFromTLD(result.data.country_tld.substring(1));
            return { geoId, tldId, continent: result.data.continent_name };
        })
        .catch(error => { return Promise.reject(error); });
};

export const getGeoLocally = async (url) => {
    const tld = await getTLDFromUrl(url);
    const country = await getCountryFromTLD(tld);
    const geoId = await getIdFromCountry(country);
    const tldId = await getIdFromTLD(tld);
    console.log(country, tld, geoId, tldId);
    return { geoId, tldId, flag: '' };
};

export const getUrlLength = async (website) => {
    return website.length;
};

export const getWhoIs = async (url) => {
    const request = axios.get(`https://talosintelligence.com/cloud_intel/whois?whois_query=` + url);
    return request
        .then(async (result) => {
            return result.data ? 1 : 0;
        })
        .catch(error => { return Promise.reject(error); });
};

export const getUrlsFromHTML = async (html) => {
    const urls = [];
    const regex = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
        urls.push(match[1]);
    }
    return urls;
}

export const isAbnormal = async (url, hostname) => {
    return url.includes(hostname) ? 1 : 0;
};

export const dotCount = async (url) => {
    return url.split('.').length;
}

export const wwwCount = async (url) => {
    return url.split('www.').length;
}

export const etaCount = async (url) => {
    return url.split('@').length;
}

export const dirCount = async (url) => {
    return url.split('/').length;
}

export const embededDomainCount = async (url) => {
    return url.split('//').length;
}

export const isShortUrl = async (domain) => {
    const shorts = ['bit.ly', 'goo.gl', 'shorte.st', 'go2l.ink', 'x.co', 'ow.ly', 't.co', 'tinyurl', 'tr.im', 'is.gd', 'cli.gs',
        'yfrog.com', 'migre.me', 'ff.im', 'tiny.cc', 'url4.eu', 'twit.ac', 'su.pr', 'twurl.nl', 'snipurl.com',
        'short.to', 'BudURL.com', 'ping.fm', 'post.ly', 'Just.as', 'bkite.com', 'snipr.com', 'fic.kr', 'loopt.us',
        'doiop.com', 'short.ie', 'kl.am', 'wp.me', 'rubyurl.com', 'om.ly', 'to.ly', 'bit.do', 't.co', 'lnkd.in',
        'db.tt', 'qr.ae', 'adf.ly', 'goo.gl', 'bitly.com', 'cur.lv', 'tinyurl.com', 'ow.ly', 'bit.ly', 'ity.im',
        'q.gs', 'is.gd', 'po.st', 'bc.vc', 'twitthis.com', 'u.to', 'j.mp', 'buzurl.com', 'cutt.us', 'u.bb', 'yourls.org',
        'x.co', 'prettylinkpro.com', 'scrnch.me', 'filoops.info', 'vzturl.com', 'qr.net', '1url.com', 'tweez.me', 'v.gd',
        'tr.im', 'link.zip.net']
    shorts.forEach(short => {
        if (domain.includes(short)) {
            return 1;
        }
    });
    return 0;
};

export const httpCount = async (url) => {
    return url.split('http://').length;
}

