import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();
const tokens = input.match(/(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g);

let enabled = true;
const result = tokens.reduce((total, token) => {
  switch (token) {
    case "do()":
      enabled = true;
      return total;

    case "don't()":
      enabled = false;
      return total;

    default:
      return enabled
        ? total +
            Number(token.match(/mul\((\d+),\d+\)/)[1]) *
              Number(token.match(/mul\(\d+,(\d+)\)/)[1])
        : total;
  }
}, 0);

console.log(result);
