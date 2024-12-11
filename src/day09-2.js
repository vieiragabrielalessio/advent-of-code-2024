import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();
const blocks = input.split("").map(Number);

const disk = [];
let fileId = 0;

function findFreeSpaceIndex(length) {
  loop: for (let i = 0; i < disk.length - length - 1; i++) {
    for (let j = 0; j < length; j++) {
      if (disk[i + j] !== null) continue loop;
    }
    return i;
  }
  return -1;
}

for (let i = 0; i < blocks.length; i++) {
  const block = blocks[i];
  for (let j = 0; j < block; j++) {
    disk.push(i % 2 === 0 ? fileId : null);
  }
  if (i % 2 === 0) fileId++;
}

for (let fileId = disk[disk.length - 1]; fileId > 0; fileId--) {
  const fileIndexes = disk.reduce((total, block, index) => {
    if (block === fileId) {
      total.push(index);
    }
    return total;
  }, []);

  const target = findFreeSpaceIndex(fileIndexes.length);
  if (target !== -1 && target < fileIndexes[0]) {
    for (let i = 0; i < fileIndexes.length; i++) {
      disk[fileIndexes[i]] = null;
      disk[target + i] = fileId;
    }
  }
}

const result = disk.reduce(
  (checksum, block, index) => checksum + block * index,
  0
);

console.log(result);
