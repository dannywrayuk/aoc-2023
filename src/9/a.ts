// https://adventofcode.com/2023/day/9

const file = Bun.file("./src/9/data.txt");
const text = await file.text();

const data = text.split("\n").map((x) => x.split(" ").map((x) => Number(x)));

const getDifferences = (x: number[]) =>
  x.reduce((result, next, id) => {
    if (id + 1 > x.length - 1) return result;
    result[id] = x[id + 1] - next;
    return result;
  }, [] as number[]);

const getNextEntry = (x: number[]) => {
  const differences = [];
  differences.push(x);
  differences.push(getDifferences(x));
  while (!differences.at(-1)?.every((x) => x === 0)) {
    differences.push(getDifferences(differences.at(-1) || []));
  }

  differences.reduceRight((result, next, id) => {
    next.push((next?.at(-1) || 0) + (result?.[id + 1]?.at(-1) || 0));
    return result;
  }, differences);

  console.log(differences);

  return differences.at(0)?.at(-1);
};

const nextEntries = data.map((x) => getNextEntry(x));

const sumArray = <T>(x: Array<T>) =>
  x.reduce((sum, next) => Number(sum) + Number(next), 0);

const sum = sumArray(nextEntries);

console.log(sum);
