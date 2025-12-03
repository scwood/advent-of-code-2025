import { readFileSync } from "node:fs";

function main(argv: string[]) {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const banks = input.split("\n");

  let totalJoltage = 0;

  for (const bank of banks) {
    let largestJoltage = 0;
    for (let i = 0; i < bank.length; i++) {
      for (let j = i + 1; j <= bank.length; j++) {
        const joltage = parseInt(bank.charAt(i) + bank.charAt(j));
        largestJoltage = Math.max(largestJoltage, joltage);
      }
    }
    totalJoltage += largestJoltage;
  }

  console.log(totalJoltage);
}

if (import.meta.main) {
  main(process.argv);
}
