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
  return winCount;
});

console.log(wins);

const multipliers = Array(wins.length).fill(1);

const incrementNextN = (
  array: number[],
  start: number,
  length: number,
  increase: number
) => {
  for (let i = start; i < start + length; i++) {
    array[i] = array[i] + increase;
  }
};

const accumulatedWins = wins.reduce((result, next, id) => {
  incrementNextN(result, id + 1, next, result[id]);
  return result;
}, multipliers);

console.log(accumulatedWins);

const sumArray = <T>(x: Array<T>) =>
  x.reduce((sum, next) => Number(sum) + Number(next), 0);

const sum = sumArray(accumulatedWins);

console.log(sum);
