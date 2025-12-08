import { readFileSync } from "node:fs";

function main(argv: string[]): void {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const lines = input.split("\n");
  const manifold = lines.map((line) => line.split(""));

  const startX = manifold[0].findIndex((value) => value === "S");
  const startY = 0;
  const numberOfSplits = countSplits(manifold, startX, startY);

  console.log(numberOfSplits);
}

function countSplits(manifold: string[][], x: number, y: number): number {
  if (y < 0 || y > manifold.length - 1 || x < 0 || x > manifold[0].length - 1) {
    return 0;
  }

  const currentChar = manifold[y][x];
  switch (currentChar) {
    case ".":
    case "S":
      manifold[y][x] = "|";
      return countSplits(manifold, x, y + 1);
    case "^":
      const leftCount = countSplits(manifold, x - 1, y);
      const rightCount = countSplits(manifold, x + 1, y);
      return 1 + leftCount + rightCount;
    case "|":
    default:
      return 0;
  }
}

main(process.argv);
