import { readFileSync } from "node:fs";

interface Coordinate {
  x: number;
  y: number;
  z: number;
}

interface Box {
  circuit: Circuit;
  position: Coordinate;
}

interface Circuit {
  boxes: Box[];
}

interface Connection {
  box1: Box;
  box2: Box;
  distance: number;
}

function main(argv: string[]): void {
  const inputFilePath = argv[2];
  const input = readFileSync(inputFilePath).toString();
  const [boxes, circuits] = parseInput(input);
  const circuitSet = new Set(circuits);
  const connections = calculateConnections(boxes);
  connections.sort((a, b) => a.distance - b.distance);

  for (const nextSmallestConnection of connections) {
    const box1 = nextSmallestConnection.box1;
    const box2 = nextSmallestConnection.box2;
    if (box1.circuit === box2.circuit) {
      continue;
    }
    const oldCircuit1 = box1.circuit;
    const oldCircuit2 = box2.circuit;
    const newCircuit: Circuit = {
      boxes: [...box1.circuit.boxes, ...box2.circuit.boxes],
    };
    for (const box of newCircuit.boxes) {
      box.circuit = newCircuit;
    }
    circuitSet.delete(oldCircuit1);
    circuitSet.delete(oldCircuit2);
    circuitSet.add(newCircuit);

    if (circuitSet.size === 1) {
      const answer = box1.position.x * box2.position.x;
      console.log(answer);
      return;
    }
  }
}

function parseInput(input: string): [Box[], Circuit[]] {
  const lines = input.split("\n");
  const boxes: Box[] = [];
  const circuits: Circuit[] = [];

  for (const line of lines) {
    const circuit: Circuit = {
      boxes: [],
    };
    const [xString, yString, zString] = line.split(",");
    const box: Box = {
      circuit,
      position: {
        x: parseInt(xString),
        y: parseInt(yString),
        z: parseInt(zString),
      },
    };
    circuit.boxes.push(box);
    circuits.push(circuit);
    boxes.push(box);
  }

  return [boxes, circuits];
}

function calculateConnections(boxes: Box[]): Connection[] {
  const connections: Connection[] = [];
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const box1 = boxes[i];
      const box2 = boxes[j];
      connections.push({
        box1,
        box2,
        distance: calculateEuclideanDistance(box1.position, box2.position),
      });
    }
  }
  return connections;
}

function calculateEuclideanDistance(p: Coordinate, q: Coordinate): number {
  return Math.sqrt(
    Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2) + Math.pow(p.z - q.z, 2),
  );
}

main(process.argv);
