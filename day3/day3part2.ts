import { readFileSync } from "node:fs";

function main(argv: string[]) {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const banks = input.split("\n");
  const totalJoltage = banks.reduce((sum, bank) => {
    return sum + getLargestJoltage(bank);
  }, 0);
  console.log(totalJoltage);
}

function getLargestJoltage(bank: string): number {
  const joltages = bank.split("").map((value) => parseInt(value));
  let result = "";
  let currentIndex = 0;
  let nextIndex = 0;
  let highestValue = 0;
  for (let i = 12; i > 0; i--) {
    for (let j = currentIndex; j <= joltages.length - i; j++) {
      if (joltages[j] > highestValue) {
        highestValue = joltages[j];
        nextIndex = j + 1;
      }
    }
    result += String(highestValue);
    highestValue = 0;
    currentIndex = nextIndex;
    nextIndex = nextIndex + 1;
  }
  return parseInt(result);
}

main(process.argv);
