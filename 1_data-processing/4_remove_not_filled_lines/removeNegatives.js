const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const ObjectsToCsv = require('objects-to-csv');

const rows = [];

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv;
const fileName = argv.file;

function splitArrayIntoChunksOfLen(arr, len) {
    var chunks = [], i = 0, n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}

async function main() {
    const newRows = splitArrayIntoChunksOfLen(rows, 1000);
    newRows.map(async (item, key) => {
        const csvObj = new ObjectsToCsv(item);
        await csvObj.toDisk('./' + key + `${fileName}-filled.csv`);
    });
    return Promise.resolve("Separation done");
}

let removedCount = 0;

fs.createReadStream(path.resolve(__dirname, `./${fileName}.csv`))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => Object.values(row).filter(item => item === "-1").length === 0 ? rows.push(row) : removedCount++)
    .on('end', async () => {
        console.log("REMOVED", removedCount)
        await main();
    });

