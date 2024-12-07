import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();

const result = input
  .split("\n")
  .map((line) => line.match(/\d+/g).map(Number))
  .filter(([test, ...numbers]) => {
    const stack = [{ target: test, index: numbers.length - 1 }];

    while (stack.length > 0) {
      const { target, index } = stack.pop();

      if (index === 0) {
        if (target === numbers[0]) {
          return true;
        }
        continue;
      }

      const next = numbers[index];

      stack.push({
        target: target - next,
        index: index - 1,
      });

      if (target % next === 0) {
        stack.push({
          target: target / next,
          index: index - 1,
        });
      }
    }
    return false;
  })
  .reduce((total, [test, ...numbers]) => total + test, 0);

console.log(result);
