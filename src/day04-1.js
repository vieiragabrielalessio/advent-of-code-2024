import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();
const grid = input.split("\n").map((line) => line.split(""));

const rows = grid.length;
const cols = grid[0].length;

const directions = [
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

function findXMAS(x, y, direction) {
  const XMAS = "XMAS";
  for (let i = 0; i < XMAS.length; i++) {
    const dx = x + direction.x * i;
    const dy = y + direction.y * i;
    if (
      dx < 0 ||
      dx >= rows ||
      dy < 0 ||
      dy >= cols ||
      grid[dx][dy] !== XMAS[i]
    )
      return false;
  }

  return true;
}

let result = 0;
for (let x = 0; x < rows; x++) {
  for (let y = 0; y < cols; y++) {
    for (const direction of directions) {
      if (findXMAS(x, y, direction)) result++;
    }
  }
}

console.log(result);
