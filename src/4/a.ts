// https://adventofcode.com/2023/day/4

const file = Bun.file("./src/4/data.txt");
const text = await file.text();
const lines = text.split("\n");

const parseNumbers = (numbers: string) => {
  return numbers
    .trim()
    .split(/\s+/)
    .map((x) => Number(x));
};

const compareWinners = (winners: number[], entries: number[]) => {
  return winners.reduce((sum, next) => {
    if (entries.includes(next)) sum += 1;
    return sum;
  }, 0);
};

const wins = lines.map((line) => {
  const cardPieces = line.split(":")[1].split("|");
  const winners = parseNumbers(cardPieces[0]);
  const entries = parseNumbers(cardPieces[1]);

  const winCount = compareWinners(winners, entries);
  if (winCount === 0) return 0;
  return Math.pow(2, winCount - 1);
});

console.log(wins);

const sumArray = <T>(x: Array<T>) =>
  x.reduce((sum, next) => Number(sum) + Number(next), 0);

const sum = sumArray(wins);

console.log(sum);
