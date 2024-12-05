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

function fixOrder(order) {
  loop: while (true) {
    const visited = new Set();
    for (let i = 0; i < order.length; i++) {
      if (visited.has(order[i])) {
        // move the number one position before towards the start of the array
        order = [
          ...order.slice(0, i - 1),
          order[i],
          order[i - 1],
          ...order.slice(i + 1, order.length),
        ];
        continue loop;
      }
      rules
        .filter((rule) => rule[1] === order[i])
        .forEach((rule) => visited.add(rule[0]));
    }
    return order;
  }
}

const result = orders
  .filter((order) => !isCorrectOrder(order))
  .map((order) => fixOrder(order))
  .reduce((total, order) => total + order[(order.length - 1) / 2], 0);

console.log(result);
