const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv;
const fileName = argv.file;

const rows = [];

async function main() {
    fs.writeFile(`./${fileName}.json`, JSON.stringify(rows), (err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(`${fileName}.json has been saved!`)
    })
}

fs.createReadStream(path.resolve(__dirname, fileName + '.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => rows.push(row))
    .on('end', async () => {
        await main();
    });

