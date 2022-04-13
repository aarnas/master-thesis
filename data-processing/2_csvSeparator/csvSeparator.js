const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const ObjectsToCsv = require('objects-to-csv');

const rows = [];

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv;
const fileName = argv.file;
const folder = argv.folder;

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
    console.log("NEW ITEM", item)
    const csvObj = new ObjectsToCsv(item);
    await csvObj.toDisk(`./${folder}/${fileName}_` + key + '.csv');
  });
  return Promise.resolve("Separation done");
}

fs.createReadStream(path.resolve(__dirname, `./${fileName}.csv`))
  .pipe(csv.parse({ headers: true }))
  .on('error', error => console.error(error))
  .on('data', row => rows.push(row))
  .on('end', async () => {
    const result = await main();
    console.log(result);
  });

