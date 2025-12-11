import { readFileSync } from "node:fs";

interface Device {
  name: string;
  outputs: Device[];
}

function main(argv: string[]): void {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const devicesByName = parseDevices(input);
  const answer = countOutputs(devicesByName["svr"], false, false, {});
  console.log(answer);
}

function parseDevices(input: string): Record<string, Device> {
  const devicesByName: Record<string, Device> = {};
  const deviceStrings = input.split("\n");

  for (const deviceString of deviceStrings) {
    const [name] = deviceString.split(": ");
    const device: Device = { name, outputs: [] };
    devicesByName[name] = device;
  }

  devicesByName["out"] = { name: "out", outputs: [] };

  for (const deviceString of deviceStrings) {
    const [name, outputsString] = deviceString.split(": ");
    const outputNames = outputsString.split(" ");
    for (const outputName of outputNames) {
      devicesByName[name].outputs.push(devicesByName[outputName]);
    }
  }

  return devicesByName;
}

function countOutputs(
  device: Device,
  seenDac: boolean,
  seenFft: boolean,
  cache: Record<string, number>,
): number {
  if (device.name === "out") {
    if (seenDac && seenFft) {
      return 1;
    } else {
      return 0;
    }
  }

  const currentKey = getCacheKey(device, seenDac, seenFft);
  if (currentKey in cache) {
    return cache[currentKey];
  }

  const isDac = device.name === "dac";
  const isFft = device.name === "fft";

  const count = device.outputs.reduce((sum, outputDevice) => {
    const outputDeviceCount = countOutputs(
      outputDevice,
      seenDac || isDac,
      seenFft || isFft,
      cache,
    );
    return sum + outputDeviceCount;
  }, 0);

  cache[currentKey] = count;
  return count;
}

function getCacheKey(device: Device, seenDac: boolean, seenFft: boolean) {
  return `${device.name},${seenDac},${seenFft}`;
}

main(process.argv);
