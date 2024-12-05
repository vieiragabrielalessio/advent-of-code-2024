import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();

const rules = input
  .split("\n\n")[0]
  .split("\n")
  .map((line) => line.split("|").map(Number));

const orders = input
  .split("\n\n")[1]
  .split("\n")
  .map((line) => line.split(",").map(Number));

function isCorrectOrder(order) {
  const visited = new Set();
  for (const num of order) {
    if (visited.has(num)) {
      return false;
    }
    rules
      .filter((rule) => rule[1] === num)
      .forEach((rule) => visited.add(rule[0]));
  }
  return true;
}

const result = orders
  .filter((order) => isCorrectOrder(order))
  .reduce((total, order) => total + order[(order.length - 1) / 2], 0);

console.log(result);
