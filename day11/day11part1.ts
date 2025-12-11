import { readFileSync } from "node:fs";

interface Device {
  name: string;
  outputs: Device[];
}

function main(argv: string[]): void {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const deviceStrings = input.split("\n");
  const devicesByName: Record<string, Device> = {};

  for (const deviceString of deviceStrings) {
    const [name] = deviceString.split(": ");
    const newDevice: Device = { name, outputs: [] };
    devicesByName[name] = newDevice;
  }

  devicesByName["out"] = { name: "out", outputs: [] };

  for (const deviceString of deviceStrings) {
    const [name, outputsString] = deviceString.split(": ");
    const outputNames = outputsString.split(" ");
    for (const outputName of outputNames) {
      devicesByName[name].outputs.push(devicesByName[outputName]);
    }
  }

  const answer = countExits(devicesByName["you"]);
  console.log(answer);
}

function countExits(device: Device): number {
  if (device.name === "out") {
    return 1;
  }
  return device.outputs.reduce((sum, outputDevice) => {
    return sum + countExits(outputDevice);
  }, 0);
}

main(process.argv);
