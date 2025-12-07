import { readFileSync } from "node:fs";

function main(argv: string[]): void {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const [rangeStrings, idStrings] = input.split("\n\n");

  const ranges = rangeStrings.split("\n").map((line) => {
    const [min, max] = line.split("-");
    return { min: parseInt(min), max: parseInt(max) };
  });

  const ids = idStrings.split("\n").map((line) => parseInt(line));

  let freshCount = 0;

  for (const id of ids) {
    for (const range of ranges) {
      if (id >= range.min && id <= range.max) {
        freshCount++;
        break;
      }
    }
  }

  console.log(freshCount);
}

main(process.argv);
