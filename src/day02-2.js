import { readFileSync } from "node:fs";

const input = readFileSync(process.argv[2], "utf8").trim();
const reports = input.split("\n").map((line) => line.split(/\s+/).map(Number));

function isSafe(report) {
  const isIncreasing = report.every(
    (level, i) =>
      i === 0 || (level - report[i - 1] >= 1 && level - report[i - 1] <= 3)
  );

  const isDecreasing = report.every(
    (level, i) =>
      i === 0 || (report[i - 1] - level >= 1 && report[i - 1] - level <= 3)
  );

  return isIncreasing || isDecreasing;
}

const result = reports.reduce((total, report) => {
  for (let i = 0; i < report.length; i++) {
    if (
      isSafe([...report.slice(0, i), ...report.slice(i + 1, report.length)])
    ) {
      return total + 1;
    }
  }
  return total;
}, 0);

console.log(result);
