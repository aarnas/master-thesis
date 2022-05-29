const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv;
const fileName = argv.file;

fs.readFile(`./${fileName}.json`, 'utf8', async (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    const urls = []
    const extracted = JSON.parse(data)
    extracted.map(item => {
        urls.push({ url: item.url })
    })
    const csv = new ObjectsToCsv(urls);
    await csv.toDisk(`./${fileName}.csv`);
})