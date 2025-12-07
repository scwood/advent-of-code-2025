import { readFileSync } from "node:fs";

function main(argv: string[]): void {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();

  const lines = input.split("\n");
  const grid = lines.map((line) => line.split(""));

  let finalCount = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (!isPaper(grid, x, y)) {
        continue;
      }

      let surroundingCount = 0;

      const surroundingPositions = [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y - 1],
        [x, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
      ];

      for (const [x, y] of surroundingPositions) {
        if (isPaper(grid, x, y)) {
          surroundingCount++;
        }
      }

      if (surroundingCount < 4) {
        finalCount++;
      }
    }
  }

  console.log(finalCount);
}

function isPaper(grid: string[][], x: number, y: number): boolean {
  if (y < 0 || y > grid.length - 1 || x < 0 || x > grid[y].length - 1) {
    return false;
  }
  return grid[y][x] === "@";
}

main(process.argv);
