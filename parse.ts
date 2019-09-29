import { Parser } from "json2csv"
import sample from "./sample.json"
import { writeFileSync } from "fs"
const parser = new Parser({ flatten: true })
writeFileSync("./sample.csv", parser.parse(sample.data.search.business))