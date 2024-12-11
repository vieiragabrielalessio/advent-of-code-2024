import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();
const blocks = input.split("").map(Number);

const disk = [];
let fileId = 0;

for (let i = 0; i < blocks.length; i++) {
  const block = blocks[i];
  for (let j = 0; j < block; j++) {
    disk.push(i % 2 === 0 ? fileId : null);
  }
  if (i % 2 === 0) fileId++;
}

while (true) {
  const index = disk.findIndex((block) => block === null);
  if (index === -1) break;
  const last = disk.pop();
  disk[index] = last;
}

const result = disk.reduce(
  (checksum, block, index) => checksum + block * index,
  0
);

console.log(result);
