import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();
const grid = input.split("\n").map((line) => line.split(""));

const rows = grid.length;
const cols = grid[0].length;

const antennas = {};
const antinodes = new Set();

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const cell = grid[row][col];
    if (cell !== ".") {
      if (!antennas[cell]) {
        antennas[cell] = [];
      }
      antennas[cell].push([col, row]);
    }
  }
}

for (const freq in antennas) {
  const cords = antennas[freq];
  for (let [x1, y1] of cords) {
    for (let [x2, y2] of cords) {
      if (x1 === x2 && y1 === y2) continue;
      for (let i = -Math.max(rows, cols); i < Math.max(rows, cols); i++) {
        const dx = x1 + i * (x2 - x1);
        const dy = y1 + i * (y2 - y1);
        if (dx >= 0 && dx < cols && dy >= 0 && dy < rows) {
          antinodes.add(`${dx},${dy}`);
        }
      }
    }
  }
}

console.log(antinodes.size);
