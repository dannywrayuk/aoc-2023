// https://adventofcode.com/2023/day/1

const file = Bun.file("./src/1/data.txt");
const text = await file.text();

const lines = text.split("\n");

const removeLetters = (line: string) => {
  return line.replaceAll(/[a-z]/g, "");
};

const wordToNumber = (line: string) => {
  return line
    .replaceAll("one", "1")
    .replaceAll("two", "2")
    .replaceAll("three", "3")
    .replaceAll("four", "4")
    .replaceAll("five", "5")
    .replaceAll("six", "6")
    .replaceAll("seven", "7")
    .replaceAll("eight", "8")
    .replaceAll("nine", "9");
};

const replaceFromLeft = (line: string, replacer: (line: string) => string) =>
  line.split("").reduce((result, next) => replacer(result + next), "");

const replaceFromRight = (line: string, replacer: (line: string) => string) =>
  line.split("").reduceRight((result, next) => replacer(next + result), "");

const lineToNumber = (line: string) => {
  const withoutWordsLeft = replaceFromLeft(line, wordToNumber);
  const numberStringLeft = removeLetters(withoutWordsLeft);
  const firstNumber = numberStringLeft.at(0);

  const withoutWordsRight = replaceFromRight(line, wordToNumber);
  const numberStringRight = removeLetters(withoutWordsRight);
  const lastNumber = numberStringRight.at(-1);

  return Number(`${firstNumber}${lastNumber}`);
};

const numberList = lines.map(lineToNumber);

const sum = numberList.reduce((sum, next) => sum + next, 0);

console.log(sum);
