import { readFileSync } from "node:fs";

interface Coordinate {
  x: number;
  y: number;
}

function main(argv: string[]): void {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const lines = input.split("\n");

  const coordinates: Coordinate[] = [];
  for (const line of lines) {
    const [xString, yString] = line.split(",");
    coordinates.push({ x: parseInt(xString), y: parseInt(yString) });
  }

  let currentMax = 0;
  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      const area = calculateArea(coordinates[i], coordinates[j]);
      currentMax = Math.max(currentMax, area);
    }
  }
  console.log(currentMax);
}

function calculateArea(a: Coordinate, b: Coordinate) {
  return (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);
}

main(process.argv);
