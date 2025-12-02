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
      console.log("ID", id);
      if (!isValid(id)) {
        console.log("Invalid");
        finalSum += i;
      } else {
        console.log("Valid");
      }
    }
  }

  console.log(finalSum);
}

function isValid(id: string): boolean {
  const substrings = getSubstrings(id);
  console.log("Substrings", substrings);
  for (const substring of substrings) {
    if (isSubstringRepeating(id, substring)) {
      return false;
    }
  }
  return true;
}

function getSubstrings(id: string) {
  const result = [];
  for (let i = 1; i <= id.length; i++) {
    result.push(id.substring(0, i));
  }
  return result;
}

function isSubstringRepeating(id: string, substring: string) {
  for (let i = 0; i <= id.length - substring.length; i += substring.length) {
    const substringToCompare = id.substring(i, i + substring.length);
    console.log("comparing: ", substringToCompare);
    if (substring !== id.substring(i, i + substring.length)) {
      return false;
    }
  }
  return true;
}

if (import.meta.main) {
  main(process.argv);
}
