import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();
const grid = input.split("\n").map((line) => line.split(""));

const rows = grid.length;
const cols = grid[0].length;

function findXMAS(x, y) {
  return (
    grid[x][y] === "A" &&
    ((grid[x - 1][y - 1] === "M" && grid[x + 1][y + 1] === "S") ||
      (grid[x - 1][y - 1] === "S" && grid[x + 1][y + 1] === "M")) &&
    ((grid[x - 1][y + 1] === "M" && grid[x + 1][y - 1] === "S") ||
      (grid[x - 1][y + 1] === "S" && grid[x + 1][y - 1] === "M"))
  );
}

let result = 0;
for (let row = 1; row < rows - 1; row++) {
  for (let col = 1; col < cols - 1; col++) {
    if (findXMAS(row, col)) result++;
  }
}

console.log(result);
