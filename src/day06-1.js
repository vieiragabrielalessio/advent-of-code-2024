import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();
const grid = input.split("\n").map((line) => line.split(""));

const rows = grid.length;
const cols = grid[0].length;

const directions = [
  { x: 0, y: -1 }, // bottom to top
  { x: 1, y: 0 }, // left to right
  { x: 0, y: 1 }, // top to bottom
  { x: -1, y: 0 }, // right to left
];

let currDir = 0;
let [guardX, guardY] = grid
  .map((row, y) => [row.findIndex((cell) => cell === "^"), y])
  .filter(([x, y]) => x !== -1)[0];

const visited = {};
visited[[guardX, guardY]] = true;

while (guardY > 0 && guardY < rows - 1 && guardX > 0 && guardX < cols - 1) {
  const direction = directions[currDir];

  if (grid[guardY + direction.y][guardX + direction.x] === "#") {
    currDir++;
    currDir %= 4;
    continue;
  }

  guardX += direction.x;
  guardY += direction.y;
  visited[[guardX, guardY]] = true;
}

const result = Object.keys(visited).length;

console.log(result);
