import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();
const lines = input.split("\n");

const leftList = lines.map((line) => line.split(/\s+/)[0]).sort();
const rightList = lines.map((line) => line.split(/\s+/)[1]).sort();

const result = leftList.reduce(
  (sum, curr, index) => sum + Math.abs(curr - rightList[index]),
  0
);

console.log(result);
