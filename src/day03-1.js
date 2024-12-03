import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();
const result = input
  .match(/mul\(\d{1,3},\d{1,3}\)/g)
  .map(
    (mul) =>
      Number(mul.match(/mul\((\d+),\d+\)/)[1]) *
      Number(mul.match(/mul\(\d+,(\d+)\)/)[1])
  )
  .reduce((total, curr) => total + curr);

console.log(result);
