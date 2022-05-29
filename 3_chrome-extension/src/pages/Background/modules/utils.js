const id_to_country = require('../../../assets/grouping/id_to_country.js');
const id_to_tld = require('../../../assets/grouping/id_to_tld.js');
const tld_to_country = require('../../../assets/grouping/tld_to_country.js');

export function toPercent(decimal) {
    return Math.round(decimal * 100);
}

export const getIdFromCountry = async (country) => {
    return new Promise((resolve, reject) => {
        Object.entries(id_to_country).forEach(([key, value]) => {
            if (value == country) {
                resolve(key);
            }
        });
        resolve("-1");
    });
}

export const getTLDFromUrl = async (url) => {
    return new Promise((resolve, reject) => {
        Object.entries(id_to_tld).forEach(([key, value]) => {
            if (url.includes(value)) {
                resolve(value);
            }
        });
        resolve("-1");
    });
}

export const getIdFromTLD = async (tld) => {
    return new Promise((resolve, reject) => {
        Object.entries(id_to_tld).forEach(([key, value]) => {
            if (value == tld) {
                resolve(key);
            }
        });
        resolve("-1");
    });
}

export const getCountryFromTLD = async (tld) => {
    return new Promise((resolve, reject) => {
        tld_to_country.map(input => {
            if (input.tlds.includes('.' + tld)) {
                resolve(input.country);
            }
        })
        resolve("-1");
    });
}