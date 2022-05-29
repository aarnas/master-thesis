export const savePredictionToLocalStorage = (url, ip, geo, tld, urlL, whois, https, probability, secondsTaken) => {
    chrome.storage.local.get('visitedWebsites', value => {
        const visitedWebsite = {
            url: url,
            ip: ip,
            geo: geo,
            tld: tld,
            urlLength: urlL,
            whois: whois,
            https: https,
            bad: probability,
            secondsTaken: secondsTaken
        }
        // check if no value set yet
        if (Object.keys(value).length === 0) {
            return chrome.storage.local.set({
                visitedWebsites: [
                    {
                        ...visitedWebsite,
                        numberOfVisits: 1
                    }
                ]
            });
        }
        // check if url exists
        const isOldUrl = value.visitedWebsites.find(el => {
            return el.url === url;
        });
        if (!isOldUrl) {
            // if new url add to list
            value.visitedWebsites.push({
                ...visitedWebsite,
                numberOfVisits: 1
            });
        } else {
            // if it's not a new url add numberOfVisits
            let newValue = value.visitedWebsites.map(value => {
                if (value.url === url) {
                    value.numberOfVisits += 1
                }
                return value;
            });
            value.visitedWebsites = newValue;
        }
        // sort by numberOfVisits
        value.visitedWebsites = value.visitedWebsites.sort(
            (object1, object2) => {
                return object2.numberOfVisits - object1.numberOfVisits;
            }
        );
        chrome.storage.local.set(value);
    });
};

export const saveHTMLToLocalStorage = (url, html) => {
    chrome.storage.local.get('visitedHTMLs', value => {
        const visitedHTML = {
            url: url,
            html: html
        }
        // check if no value set yet
        if (Object.keys(value).length === 0) {
            return chrome.storage.local.set({
                visitedHTMLs: [
                    {
                        ...visitedHTML
                    }
                ]
            });
        }
        // check if url exists
        const isOldUrl = value.visitedHTMLs.find(el => {
            return el.url === url;
        });
        if (!isOldUrl) {
            // if new url add to list
            value.visitedHTMLs.push({
                ...visitedHTML
            });
        }
        chrome.storage.local.set(value);
    });
};