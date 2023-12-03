// https://adventofcode.com/2023/day/1

const file = Bun.file("./src/1/data.txt");
const text = await file.text();

const lines = text.split("\n");

const removeLetters = (line: string) => {
  return line.replaceAll(/[a-z]/g, "");
};

const lineToNumber = (line: string) => {
  const numberString = removeLetters(line);
  const firstNumber = numberString.at(0);
  const lastNumber = numberString.at(-1);

  return Number(`${firstNumber}${lastNumber}`);
};

const numberList = lines.map(lineToNumber);

const sum = numberList.reduce((sum, next) => sum + next, 0);

console.log(sum);
