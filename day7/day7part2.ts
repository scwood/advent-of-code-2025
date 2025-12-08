import { readFileSync } from "node:fs";

function main(argv: string[]): void {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const lines = input.split("\n");
  const manifold = lines.map((line) => line.split(""));

  const startX = manifold[0].findIndex((value) => value === "S");
  const startY = 0;

  // Create 2d array to cache count values
  const counts: number[][] = [];
  for (let y = 0; y < manifold.length; y++) {
    const row: number[] = [];
    for (let x = 0; x < manifold[y].length; x++) {
      row.push(0);
    }
    counts.push(row);
  }

  const numberOfTimelines = countTimelines(manifold, counts, startX, startY);

  console.log(numberOfTimelines);
}

function countTimelines(
  manifold: string[][],
  counts: number[][],
  x: number,
  y: number,
): number {
  // If out of bounds, return 0
  if (y < 0 || y > manifold.length - 1 || x < 0 || x > manifold[0].length - 1) {
    return 0;
  }

  // If at the bottom of the tree, return 1
  if (y === manifold.length - 1) {
    return 1;
  }

  const currentChar = manifold[y][x];
  switch (currentChar) {
    // If an unvisited space, mark as visited and recurse to space below and
    // update count cache
    case ".":
    case "S":
      manifold[y][x] = "|";
      counts[y][x] = countTimelines(manifold, counts, x, y + 1);
      return counts[y][x];
    // If a splitter, check cache for existing left and right values, otherwise
    // recurse
    case "^":
      const leftCount =
        counts[y][x - 1] > 0
          ? counts[y][x - 1]
          : countTimelines(manifold, counts, x - 1, y);
      const rightCount =
        counts[y][x + 1] > 0
          ? counts[y][x + 1]
          : countTimelines(manifold, counts, x + 1, y);
      return leftCount + rightCount;
    // If a visited space, return cached count value
    case "|":
      return counts[y][x];
    // Shouldn't hit this
    default:
      return 0;
  }
}

main(process.argv);
