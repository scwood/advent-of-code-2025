import { readFileSync } from "node:fs";

interface Range {
  min: number;
  max: number;
}

function main(argv: string[]): void {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();

  const [rangeStrings] = input.split("\n\n");
  const ranges: Range[] = rangeStrings.split("\n").map((line) => {
    const [min, max] = line.split("-");
    return { min: parseInt(min), max: parseInt(max) };
  });

  const combinedRanges = combineRanges(ranges);
  let freshCount = 0;

  for (const range of combinedRanges) {
    freshCount += range.max - range.min + 1;
  }

  console.log(freshCount);
}

function combineRanges(ranges: Range[]): Range[] {
  const combinedRanges: Range[] = [];
  const sortedRanges = [...ranges].sort((a, b) => a.min - b.min);

  for (const range of sortedRanges) {
    let wasCombined = false;

    for (const combinedRange of combinedRanges) {
      if (range.min >= combinedRange.min && range.max <= combinedRange.max) {
        wasCombined = true;
        break;
      }
      if (range.min <= combinedRange.min && range.max >= combinedRange.max) {
        combinedRange.min = range.min;
        combinedRange.max = range.max;
        wasCombined = true;
        break;
      }
      if (
        range.min <= combinedRange.min &&
        range.max >= combinedRange.min &&
        range.max <= combinedRange.max
      ) {
        combinedRange.min = range.min;
        wasCombined = true;
        break;
      }
      if (
        range.min >= combinedRange.min &&
        range.min <= combinedRange.max &&
        range.max >= combinedRange.max
      ) {
        combinedRange.max = range.max;
        wasCombined = true;
        break;
      }
    }

    if (wasCombined) {
      continue;
    }

    combinedRanges.push(range);
  }

  return combinedRanges;
}

main(process.argv);
