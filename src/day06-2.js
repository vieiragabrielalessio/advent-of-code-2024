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

const startDir = 0;
const [startX, startY] = grid
  .map((row, y) => [row.findIndex((cell) => cell === "^"), y])
  .filter(([x, y]) => x !== -1)[0];

const visited = {};
visited[[startX, startY]] = true;

let currDir = startDir;
let guardX = startX;
let guardY = startY;

function canHaveObstacle(x, y) {
  const gridCopy = grid.map((_) => _.map((_) => _));
  const loopVisited = {};

  gridCopy[y][x] = "#";

  let currDir = startDir;
  let guardX = startX;
  let guardY = startY;

  loopVisited[[guardX, guardY, currDir]] = true;

  while (guardY > 0 && guardY < rows - 1 && guardX > 0 && guardX < cols - 1) {
    const direction = directions[currDir];

    if (gridCopy[guardY + direction.y][guardX + direction.x] === "#") {
      currDir++;
      currDir %= 4;
      continue;
    }

    guardX += direction.x;
    guardY += direction.y;

    if (loopVisited[[guardX, guardY, currDir]]) {
      return true;
    }

    loopVisited[[guardX, guardY, currDir]] = true;
  }

  return false;
}

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

const obstacles = {};
for (const cell in visited) {
  const [x, y] = cell.split(",");
  if (canHaveObstacle(x, y)) {
    obstacles[[x, y]] = true;
  }
}

const result = Object.keys(obstacles).length;

console.log(result);
