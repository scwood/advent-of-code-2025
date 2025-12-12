import { readFileSync } from "node:fs";

interface Machine {
  buttons: Button[];
  indicatorLights: string;
}

interface Button {
  positions: number[];
}

function main(argv: string[]): void {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const machines = parseMachines(input);
  const answer = machines.reduce((sum, machine) => {
    return sum + getMinimumButtonPresses(machine);
  }, 0);
  console.log(answer);
}

function parseMachines(input: string): Machine[] {
  const lines = input.split("\n");
  const machines: Machine[] = [];
  for (const line of lines) {
    const [indicatorLights, ...buttonStrings] = line.split(" ");
    buttonStrings.pop();
    const buttons: Button[] = [];
    for (const buttonString of buttonStrings) {
      const positions = removeEnds(buttonString)
        .split(",")
        .map((n) => parseInt(n));
      buttons.push({ positions });
    }
    machines.push({
      buttons,
      indicatorLights: removeEnds(indicatorLights),
    });
  }
  return machines;
}

function removeEnds(str: string): string {
  return str.slice(1, str.length - 1);
}

function getMinimumButtonPresses(machine: Machine): number {
  const initialLights = machine.indicatorLights.split("").fill(".").join("");
  let currentNumberOfPresses = 0;
  let currentLights = [initialLights];

  while (true) {
    currentNumberOfPresses++;
    const newLights: string[] = [];
    for (const lights of currentLights) {
      for (const button of machine.buttons) {
        const result = pressButton(lights, button);
        if (result === machine.indicatorLights) {
          return currentNumberOfPresses;
        }
        newLights.push(result);
      }
    }
    currentLights = newLights;
  }
}

function pressButton(indicatorLights: string, button: Button): string {
  const result = indicatorLights.split("");
  for (const position of button.positions) {
    if (result[position] === ".") {
      result[position] = "#";
    } else {
      result[position] = ".";
    }
  }
  return result.join("");
}

main(process.argv);
