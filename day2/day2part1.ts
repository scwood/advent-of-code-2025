import { readFileSync } from "node:fs";

function main(argv: string[]) {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const ranges = input.split(",");

  let finalSum = 0;

  for (const range of ranges) {
    const [startString, endString] = range.split("-");
    const start = parseInt(startString);
    const end = parseInt(endString);

    for (let i = start; i <= end; i++) {
      const fullString = i.toString();

      if (fullString.length % 2 !== 0) {
        continue;
      }

      const middleIndex = fullString.length / 2;
      const firstHalf = fullString.slice(0, middleIndex);
      const secondHalf = fullString.slice(middleIndex, fullString.length);

      if (firstHalf === secondHalf) {
        finalSum += i;
      }
    }
  }

  console.log(finalSum);
}

if (import.meta.main) {
  main(process.argv);
}
