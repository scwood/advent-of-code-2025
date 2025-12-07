import { readFileSync } from "node:fs";

function main(argv: string[]): void {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const lines = input.split("\n");

  const problems = lines.map((line) => line.trim().split(/\s+/));
  const numberOfProblems = problems[0].length;

  let grandTotal = 0;

  for (let x = 0; x < numberOfProblems; x++) {
    const sign = problems[problems.length - 1][x];

    let currentTotal = parseInt(problems[0][x]);
    for (let y = 1; y < problems.length - 1; y++) {
      const number = parseInt(problems[y][x]);

      if (sign === "+") {
        currentTotal += number;
      } else {
        currentTotal *= number;
      }
    }

    grandTotal += currentTotal;
  }

  console.log(grandTotal);
}

main(process.argv);
