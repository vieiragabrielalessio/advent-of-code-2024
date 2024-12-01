import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();
const lines = input.split("\n");

const leftList = lines.map((line) => line.split(/\s+/)[0]);
const rightList = lines.map((line) => line.split(/\s+/)[1]);

const result = leftList.reduce(
  (sum, curr) => sum + curr * rightList.filter((num) => num === curr).length,
  0
);

console.log(result);
