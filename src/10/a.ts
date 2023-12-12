// https://adventofcode.com/2023/day/10

const file = Bun.file("./src/10/data.txt");
const text = await file.text();

const data = text.split("\n").map((x) => x.split(""));

const maxY = data.length - 1;
const maxX = data[0].length - 1;

const findStart = () => {
  const yId = data.findIndex((x) => x.includes("S"));
  const xId = data[yId].findIndex((x) => x === "S");

  return [yId, xId];
};

const startPos = findStart();

const toThe: Record<string, (pos: number[]) => number[] | null> = {
  N: (pos: number[]) => {
    if (pos[0] - 1 < 0) return null;
    return [pos[0] - 1, pos[1]];
  },
  S: (pos: number[]) => {
    if (pos[0] + 1 > maxY) return null;
    return [pos[0] + 1, pos[1]];
  },
  E: (pos: number[]) => {
    if (pos[1] + 1 > maxX) return null;
    return [pos[0], pos[1] + 1];
  },
  W: (pos: number[]) => {
    if (pos[1] - 1 < 0) return null;
    return [pos[0], pos[1] - 1];
  },
};

const cellAt = (pos: number[] | null) => {
  if (pos === null) return null;
  return data[pos[0]][pos[1]];
};

const setCellAt = (pos: number[], value: string) => {
  data[pos[0]][pos[1]] = value;
};

const joinsPipe = (direction: string, cell: string | null) =>
  (direction === "N" && (cell === "|" || cell === "F" || cell === "7")) ||
  (direction === "S" && (cell === "|" || cell === "L" || cell === "J")) ||
  (direction === "E" && (cell === "-" || cell === "7" || cell === "J")) ||
  (direction === "W" && (cell === "-" || cell === "F" || cell === "L"));

const getNextDirection = (direction: string, cell: string) => {
  if (direction === "N") {
    switch (cell) {
      case "|":
        return "N";
      case "F":
        return "E";
      case "7":
        return "W";
      default:
        return null;
    }
  }
  if (direction === "S") {
    switch (cell) {
      case "|":
        return "S";
      case "L":
        return "E";
      case "J":
        return "W";
      default:
        return null;
    }
  }
  if (direction === "E") {
    switch (cell) {
      case "-":
        return "E";
      case "J":
        return "N";
      case "7":
        return "S";
      default:
        return null;
    }
  }
  if (direction === "W") {
    switch (cell) {
      case "-":
        return "W";
      case "L":
        return "N";
      case "F":
        return "S";
      default:
        return null;
    }
  }
  return null;
};

const getConnections = (startPos: number[]) => {
  return Object.entries(toThe)
    .map(([key, value]) =>
      joinsPipe(key, cellAt(value(startPos))) ? key : null
    )
    .filter((x) => x !== null);
};

const startConnections = getConnections(startPos);

const traverse = ({
  startPos,
  direction,
}: {
  startPos: number[];
  direction: string;
}) => {
  const nextPos = toThe[direction](startPos);
  if (nextPos === null) throw Error("pos null");
  const cellInDirection = cellAt(nextPos);
  if (cellInDirection === null) throw Error("cell null");
  const nextDirection = getNextDirection(direction, cellInDirection);
  if (nextDirection === null) throw Error("direction null");
  return { nextPos, nextDirection };
};

const positionsAreSame = (a: number[], b: number[]) =>
  a[0] === b[0] && a[1] === b[1];

let A = traverse({ startPos, direction: startConnections[0] as string });
let B = traverse({ startPos, direction: startConnections[1] as string });
let stepCounter = 0;

setCellAt(startPos, String(stepCounter));

while (!positionsAreSame(A.nextPos, B.nextPos)) {
  stepCounter++;
  A = traverse({ startPos: A.nextPos, direction: A.nextDirection });
  B = traverse({ startPos: B.nextPos, direction: B.nextDirection });
}
stepCounter++;
setCellAt(A.nextPos, String(stepCounter));

console.log(stepCounter);

// console.log(data.map((x) => x.join("")).join("\n"));
