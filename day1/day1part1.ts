import { readFileSync } from "node:fs";

function main(argv: string[]) {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const lines = input.split("\n");

  let password = 0;
  let currentPosition = 50;
  const numberOfPositions = 100;

  for (const line of lines) {
    const direction = line.charAt(0);
    const amount = parseInt(line.slice(1)) % numberOfPositions;
    if (direction === "L") {
      currentPosition -= amount;
    } else {
      currentPosition += amount;
    }
    if (currentPosition > 99) {
      currentPosition -= numberOfPositions;
    }
    if (currentPosition < 0) {
      currentPosition += numberOfPositions;
    }
    if (currentPosition === 0) {
      password++;
    }
  }

  console.log(password);
}

if (import.meta.main) {
  main(process.argv);
}
