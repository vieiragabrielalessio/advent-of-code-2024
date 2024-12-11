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
      const dx = x2 - x1;
      const dy = y2 - y1;
      const antinode1 = [x1 - dx, y1 - dy];
      const antinode2 = [x2 + dx, y2 + dy];
      for (let [x, y] of [antinode1, antinode2]) {
        if (x >= 0 && x < cols && y >= 0 && y < rows) {
          antinodes.add(`${x},${y}`);
        }
      }
    }
  }
}

console.log(antinodes.size);
