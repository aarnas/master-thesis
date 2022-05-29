import { toPercent } from './modules/utils';
import { getGeo, getUrlLength, getWhoIs, getUrlsFromHTML, getNotLocallyIP, getGeoLocally, isAbnormal, dotCount, wwwCount, etaCount, dirCount, embededDomainCount, isShortUrl, httpCount } from './modules/getters';
import { saveHTMLToLocalStorage, savePredictionToLocalStorage } from './modules/saveToLocalStorage';
import { predict } from './modules/ai';

var currentIPList = {};
chrome.webRequest.onCompleted.addListener(
    function (info) {
        currentIPList[info.url] = info.ip //+ data;
    },
    {
        urls: [],
        types: []
    },
    []
);

const getIP = (url) => {
    if (currentIPList[url] !== undefined) {
        return currentIPList[url]
    } else {
        return null
    }
};

function alerting(probability) {
    if (confirm(`⚠️ - content is suspicious. Probability: ${probability}% of insecure. \r\nThere may be phishing or other suspicious content. Please, go back by pressing OK.`)) {
        chrome.tabs.executeScript(null, { "code": "window.history.back()" });
    }
}

async function predictSite(url, ip, domain, protocol, geo) {
    const startTime = new Date().getTime()
    const geoData = geo ? geo : await getGeo(ip);
    const geoId = await geoData.geoId;
    const continent = geoData.continent;
    const tld = await geoData.tldId;
    const urlLength = await getUrlLength(url);
    const whois = await getWhoIs(domain)
    const isHttps = await protocol == "https:" ? 1 : 0;
    const abnormalUrl = await isAbnormal(url, domain);
    const countDot = await dotCount(url);
    const countWWW = await wwwCount(url);
    const countEta = await etaCount(url);
    const countDir = await dirCount(url);
    const countEmbededDomain = await embededDomainCount(url);
    const shortUrl = await isShortUrl(domain);
    const countHttp = await httpCount(url);
    const input = [Number(geoId), Number(tld), urlLength, whois, isHttps, abnormalUrl, countDot, countWWW, countEta, countDir, countEmbededDomain, shortUrl, countHttp, continent.includes('Africa') ? 1 : 0, continent.includes('Asia') ? 1 : 0, continent.includes('Europe') ? 1 : 0, continent.includes('North America') ? 1 : 0, continent.includes('South America') ? 1 : 0, continent.includes('Oceania') ? 1 : 0];
    const probability = predict(input);
    const endTime = new Date().getTime();
    const secondsTaken = ((endTime - startTime) * 0.001).toFixed(2);
    chrome.tabs.executeScript({
        code: "console.log('Input: " + input + "'); console.log('Probability of insecure: " + probability + ", took " + secondsTaken + "s');"
    });
    savePredictionToLocalStorage(url, ip, Number(geoId), Number(tld), urlLength, whois, isHttps, probability, secondsTaken);
    return probability;
}

async function predictUrls(urls) {
    const sitesProbabilities = [];
    urls.map(async (url) => {
        const regex = /((?!(w+)\.)\w*(?:\w+\.)+\w+)/g;
        const siteDomain = url.match(regex)[0];
        const siteProtocol = url.includes('https') ? "https:" : "http:";
        const ip = await getNotLocallyIP(url);
        if (ip) {
            // Not that accurate but faster 
            const geo = await getGeoLocally(url);
            console.log(siteDomain, siteProtocol, geo);
            const siteProbability = await predictSite(url, ip, siteDomain, siteProtocol);
            chrome.tabs.executeScript({
                code: "console.log('Input: " + siteDomain + "'); console.log('Probability of insecure: " + siteProbability + ");"
            });
            if (siteProbability > 0.5) {
                sitesProbabilities.push(siteProbability);
            }
        }
    });
    if (sitesProbabilities.length > 0) {
        const sitesProbabilitiesPercent = sitesProbabilities.map(toPercent).join(', ');
        chrome.tabs.executeScript({
            code: alerting(sitesProbabilitiesPercent)
        });
    }
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    const url = sender.tab.url;
    const ip = getIP(url);
    if (message.data == 'getIP') {
        sendResponse({
            ip: ip
        });
    }
    if (message.data == "predict") {
        if (ip !== null) {
            const domain = String(message.hostname).replace("www.", '');
            const protocol = message.protocol;
            const probability = await predictSite(url, ip, domain, protocol);
            const probabilityPercent = toPercent(probability);
            if (probability > 0.5) {
                chrome.tabs.executeScript({
                    code: alerting(probabilityPercent)
                });
            }
        }
    }
});

chrome.runtime.onMessage.addListener(async (message, sender) => {
    if (message.data == "html") {
        const url = sender.tab.url;
        const html = message.html;
        // const htmlUrls = await getUrlsFromHTML(html);
        // const uniqueUrls = [...new Set(htmlUrls)];
        // chrome.tabs.executeScript({
        //     code: "console.log('Urls in page: " + uniqueUrls + ");"
        // });
        saveHTMLToLocalStorage(url, html);
        //predictUrls(uniqueUrls);
    }
});