// https://adventofcode.com/2023/day/3

// This one was very hard because i did part a a bit weird. This is really inefficient, but it works 🤷‍♂️

const file = Bun.file("./src/3/data.txt");
const text = await file.text();
const onlyGears = text.replaceAll(/[^0-9.*\n]/g, ".");
const lines = onlyGears.split("\n");

const dataArray = lines.map((line) => line.split(""));

const yMax = dataArray.length - 1;
const xMax = dataArray[0].length - 1;

const numbersFromLine = (line: number, symbolPos: number) => {
  if (line < 0 || line > yMax) return ["", ""];
  const lineData = dataArray[line];
  if (lineData[symbolPos] === "." || lineData[symbolPos] === "*") {
    return [
      lineData
        .slice(0, symbolPos)
        .join("")
        .replaceAll("*", ".")
        .split(".")
        .at(-1),
      lineData
        .slice(symbolPos + 1)
        .join("")
        .replaceAll("*", ".")
        .split(".")
        .at(0),
    ];
  } else {
    if (lineData[symbolPos - 1] === ".") {
      return [lineData.slice(symbolPos, -1).join("").split(".").at(0)];
    }
    if (lineData[symbolPos + 1] === ".") {
      return [
        lineData
          .slice(0, symbolPos + 1)
          .join("")
          .split(".")
          .at(-1),
      ];
    }
    if (/[0-9]/.test(lineData[symbolPos])) {
      return [
        lineData
          .slice(symbolPos - 1, symbolPos + 2)
          .join("")
          .replaceAll(".", ""),
      ];
    }

    return ["", ""];
  }
};

const getNumbersAt = (xId: number, yId: number) => {
  const current = numbersFromLine(yId, xId);
  const above = numbersFromLine(yId - 1, xId);
  const below = numbersFromLine(yId + 1, xId);
  return [...current, ...above, ...below].filter((x) => x !== "");
};

const productArray = <T>(x: Array<T>) =>
  x.reduce((sum, next) => Number(sum) * Number(next), 1);

const sumArray = <T>(x: Array<T>) =>
  x.reduce((sum, next) => Number(sum) + Number(next), 0);

const numbers = dataArray.map((line, yId) => {
  return line.reduce((sum, next, xId) => {
    if (next === "*") {
      const connected = getNumbersAt(xId, yId);
      if (connected.length === 2) {
        sum += productArray(connected);
      }
    }
    return sum;
  }, 0);
});

const sum = sumArray(numbers);

console.log(sum);
