import { readFileSync } from "node:fs";

function main(argv: string[]): void {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const lines = input.split("\n");

  // Parse, trim, and reverse signs row for later.
  const signsLine = lines.pop() || "";
  const signs = signsLine.trim().split(/\s+/).reverse();

  // Split each line into array of characters, and rotate whole 2d array to the
  // left 90 degrees.
  const characters = lines.map((line) => line.split(""));
  const rotatedCharacters = rotateArray(characters);

  // Join and trim newly rotated lines. Each line will now be either one of the
  // final numbers or the empty line that divides the problems.
  const rotatedLines = rotatedCharacters.map((newLine) =>
    newLine.join("").trim(),
  );

  // Group related terms together into problems.
  const problems: number[][] = [];
  let currentTerms: number[] = [];

  for (let i = 0; i < rotatedLines.length; i++) {
    const line = rotatedLines[i];
    if (line) {
      currentTerms.push(parseInt(line));
    }
    if (line === "" || i === rotatedLines.length - 1) {
      problems.push([...currentTerms]);
      currentTerms = [];
    }
  }

  // Solve each problem and add to the grand total
  let grandTotal = 0;

  for (let i = 0; i < problems.length; i++) {
    const sign = signs[i];
    const problem = problems[i];

    let result = problem[0];

    for (let j = 1; j < problem.length; j++) {
      if (sign === "+") {
        result += problem[j];
      } else {
        result *= problem[j];
      }
    }

    grandTotal += result;
  }

  console.log(grandTotal);
}

function rotateArray<T>(array: T[][]): T[][] {
  const result: T[][] = [];

  if (array.length === 0) {
    return result;
  }

  for (let x = array[0].length - 1; x >= 0; x--) {
    const newRow: T[] = [];
    for (let y = 0; y < array.length; y++) {
      newRow.push(array[y][x]);
    }
    result.push(newRow);
  }

  return result;
}

main(process.argv);
