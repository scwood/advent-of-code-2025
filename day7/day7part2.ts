import { readFileSync } from "node:fs";

function main(argv: string[]): void {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const lines = input.split("\n");
  const manifold = lines.map((line) => line.split(""));

  const startX = manifold[0].findIndex((value) => value === "S");
  const startY = 0;
  visit(manifold, startX, startY);
  const counts = countTimelines(manifold);
  console.log(counts[startY][startX]);
}

function visit(manifold: string[][], x: number, y: number): void {
  if (y < 0 || y > manifold.length - 1 || x < 0 || x > manifold[0].length - 1) {
    return;
  }
  const currentChar = manifold[y][x];
  switch (currentChar) {
    case ".":
    case "S":
      manifold[y][x] = "|";
      visit(manifold, x, y + 1);
      break;
    case "^":
      visit(manifold, x - 1, y);
      visit(manifold, x + 1, y);
      break;
    case "|":
    default:
  }
}

function countTimelines(manifold: string[][]): number[][] {
  const counts: number[][] = [];

  for (let y = 0; y < manifold.length; y++) {
    const row: number[] = [];
    for (let x = 0; x < manifold[y].length; x++) {
      row.push(0);
    }
    counts.push(row);
  }

  for (let y = manifold.length - 1; y >= 0; y--) {
    for (let x = 0; x < manifold[y].length; x++) {
      const char = manifold[y][x];
      if (char !== "|") {
        continue;
      }
      if (y === manifold.length - 1) {
        counts[y][x] = 1;
        continue;
      }
      const lowerChar = manifold[y + 1][x];
      if (lowerChar === "|") {
        counts[y][x] = counts[y + 1][x];
      } else if (lowerChar === "^") {
        counts[y][x] = counts[y + 1][x - 1] + counts[y + 1][x + 1];
      }
    }
  }
  return counts;
}

main(process.argv);
