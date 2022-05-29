# Usage
`Setup`
```bash
npm i
```

`cd 1_json_CSV_Convert`

```bash
# CSV to JSON
node csvToJson.js --file=<csv_filename_without_extension>
# JSON to CSV
node jsonToCsv.js --file=<json_filename_without_extension>
```

`cd 2_csvSeparator`

```bash
node csvSeparator.js --file=<csv_filename_without_extension> --folder=<folder_for_separated_items>
```

`cd 3_csvFiller`

```bash
# To fill all values
node csvFiller.js --path=<folder_with_csv_files_to_fill> --out=<folder_for_filled_csv_files> --get=all
# To fill only specific values (e.g. only 'ip')
node csvFiller.js --path=<folder_with_csv_files_to_fill> --out=<folder_for_filled_csv_files> --get=ip
# To fill only specific values (e.g. only 'ip' and 'geo_loc')
node csvFiller.js --path=<folder_with_csv_files_to_fill> --out=<folder_for_filled_csv_files> --get=ip,geo_loc
```

`cd 4_remove_not_filled_lines`

```bash
node removeNegatives.js --file=<csv_filename_without_extension>
```
