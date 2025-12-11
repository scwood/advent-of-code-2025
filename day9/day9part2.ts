import { readFileSync } from "node:fs";

interface Coordinate {
  x: number;
  y: number;
}

/*

- Parse coordinates
- Create tiles from coordinates
- Recalculate area for each pair, but check tiles to see if valid

*/

function main(argv: string[]): void {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const coordinates = parseCoordinates(input);
  const tiles = createTiles(coordinates);

  let currentMax = 0;
  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      const area = calculateArea(coordinates[i], coordinates[j]);
      currentMax = Math.max(currentMax, area);
    }
  }
  console.log(currentMax);
}

function parseCoordinates(input: string): Coordinate[] {
  const lines = input.split("\n");
  const coordinates: Coordinate[] = [];
  for (const line of lines) {
    const [xString, yString] = line.split(",");
    coordinates.push({ x: parseInt(xString), y: parseInt(yString) });
  }
  return coordinates;
}

function calculateArea(a: Coordinate, b: Coordinate) {
  return (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);
}

function createTiles(coordinates: Coordinate[]): string[][] {
  let maxX = 0;
  let maxY = 0;
  for (const coordinate of coordinates) {
    maxX = Math.max(coordinate.x);
    maxY = Math.max(coordinate.y);
  }
  const result = new Array(maxY + 1)
    .fill(undefined)
    .map(() => new Array(maxX + 1).fill("."));
  return result;
}

function printTiles(tiles: string[][]) {
  for (const row of tiles) {
    console.log(row.join(""));
  }
}

main(process.argv);
