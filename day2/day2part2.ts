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
      const id = i.toString();
      if (!isValid(id)) {
        finalSum += i;
      }
    }
  }

  console.log(finalSum);
}

function isValid(id: string): boolean {
  if (id.length === 1) {
    return true;
  }
  const substrings = getSubstrings(id);
  for (const substring of substrings) {
    if (isSubstringRepeating(id, substring)) {
      return false;
    }
  }
  return true;
}

function getSubstrings(id: string) {
  const result = [];
  for (let i = 1; i <= Math.ceil(id.length / 2); i++) {
    result.push(id.substring(0, i));
  }
  return result;
}

function isSubstringRepeating(id: string, substring: string) {
  const chunks = chunkString(id, substring.length);
  return chunks.every((chunk) => chunk === substring);
}

function chunkString(s: string, chunkSize: number) {
  const result = [];
  for (let i = 0; i < s.length; i += chunkSize) {
    result.push(s.substring(i, i + chunkSize));
  }
  return result;
}

if (import.meta.main) {
  main(process.argv);
}
