// https://adventofcode.com/2023/day/3

const file = Bun.file("./src/3/data.txt");
const text = await file.text();
const lines = text.split("\n");

const dataArray = lines.map((line) => line.split(""));

const yMax = dataArray.length - 1;
const xMax = dataArray[0].length - 1;

const isSymbol = (x?: string) => {
  if (!x) return false;
  if (x === ".") return false;
  return !/[0-9]/.test(x);
};

const getValueAt = (x: number, y: number) => {
  if (x < 0 || y < 0 || x > xMax || y > yMax) return;
  return dataArray[y][x];
};

const checkAdjacent = (x: number, y: number) =>
  isSymbol(getValueAt(x, y + 1)) ||
  isSymbol(getValueAt(x, y - 1)) ||
  isSymbol(getValueAt(x - 1, y)) ||
  isSymbol(getValueAt(x - 1, y + 1)) ||
  isSymbol(getValueAt(x - 1, y - 1)) ||
  isSymbol(getValueAt(x + 1, y)) ||
  isSymbol(getValueAt(x + 1, y + 1)) ||
  isSymbol(getValueAt(x + 1, y - 1));

const numbers = dataArray.map((line, yId) => {
  return line.reduce(
    (sum, next, xId) => {
      const isNumber = /[0-9]/.test(next);
      if (isNumber) {
        sum.current.push({
          value: next,
          adjacentSymbol: checkAdjacent(xId, yId),
        });
      }
      if (!isNumber || xId == xMax) {
        if (
          sum.current.length > 0 &&
          sum.current.some((number) => number.adjacentSymbol)
        ) {
          sum.numbers.push(
            sum.current.reduce((number, numberDetails) => {
              number += numberDetails.value;
              return number;
            }, "")
          );
        }
        sum.current = [];
      }
      return sum;
    },
    { numbers: [], current: [] } as {
      numbers: string[];
      current: Array<{ value: string; adjacentSymbol: boolean }>;
    }
  ).numbers;
});

const sumArray = <T>(x: Array<T>) =>
  x.reduce((sum, next) => Number(sum) + Number(next), 0);

const sum = sumArray(numbers.map((x) => sumArray(x)));

console.log(sum);
