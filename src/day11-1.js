import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();
const stones = input
  .match(/\d+/g)
  .reduce((stones, stone) => ({ ...stones, [stone]: 1 }), {});

for (let i = 0; i < 25; i++) {
  for (let [stone, count] of Object.entries(stones)) {
    if (count === 0) continue;
    stones[stone] -= count;
    if (stone == 0) {
      stones[1] = (stones[1] || 0) + count;
    } else {
      const digits = Math.floor(Math.log10(stone)) + 1;
      if (digits % 2 === 0) {
        const left = Math.floor(stone / 10 ** (digits / 2));
        const right = stone % 10 ** (digits / 2);
        stones[left] = (stones[left] || 0) + count;
        stones[right] = (stones[right] || 0) + count;
      } else {
        stones[stone * 2024] = (stones[stone * 2024] || 0) + count;
      }
    }
  }
}

const result = Object.values(stones).reduce((total, count) => total + count, 0);
console.log(result);
