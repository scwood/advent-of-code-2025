import { readFileSync } from "node:fs";

function main(argv: string[]) {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const lines = input.split("\n");

  let password = 0;
  let currentPosition = 50;

  for (const line of lines) {
    const direction = line.charAt(0);
    const amount = parseInt(line.slice(1));

    for (let i = 0; i < amount; i++) {
      if (direction === "L") {
        currentPosition -= 1;
      } else {
        currentPosition += 1;
      }
      if (currentPosition === -1) {
        currentPosition = 99;
      }
      if (currentPosition === 100) {
        currentPosition = 0;
      }
      if (currentPosition === 0) {
        password++;
      }
    }
  }

  console.log(password);
}

main(process.argv);
