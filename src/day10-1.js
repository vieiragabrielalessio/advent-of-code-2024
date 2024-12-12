import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();
const grid = input.split("\n").map((line) => line.split("").map(Number));
const rows = grid.length;
const cols = grid[0].length;
const adjList = new Map();
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function findScore(trailhead) {
  const visited = new Set();
  const scores = new Set();

  function dfs(vertex) {
    visited.add(vertex);
    if (vertex.split(",")[2] === "9") {
      scores.add(vertex);
    } else {
      for (const neighbor of adjList.get(vertex)) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    }
  }

  dfs(trailhead);

  return scores.size;
}

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    adjList.set(`${x},${y},${grid[y][x]}`, []);
    for (const [dirX, dirY] of directions) {
      const dx = x + dirX;
      const dy = y + dirY;
      if (dx >= 0 && dx < cols && dy >= 0 && dy < rows) {
        if (grid[dy][dx] - grid[y][x] === 1) {
          adjList
            .get(`${x},${y},${grid[y][x]}`)
            .push(`${dx},${dy},${grid[dy][dx]}`);
        }
      }
    }
  }
}

let result = 0;
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    if (grid[y][x] === 0) {
      result += findScore(`${x},${y},${grid[y][x]}`);
    }
  }
}

console.log(result);
