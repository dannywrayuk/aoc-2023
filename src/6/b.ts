// https://adventofcode.com/2023/day/6

const file = Bun.file("./src/6/data.txt");
const text = await file.text();

const lines = text
  .split("\n")
  .map((x) => x.split(":")[1].trim().replaceAll(/\s+/g, ""));
const data = [
  {
    time: Number(lines[0]),
    distance: Number(lines[1]),
  },
];

// (time*t - t)t > distance

const minMax = data.map((x) => ({
  min: Math.floor((x.time - Math.sqrt(x.time * x.time - 4 * x.distance)) / 2),
  max: Math.ceil((x.time + Math.sqrt(x.time * x.time - 4 * x.distance)) / 2),
}));

const numSol = minMax.map((x) => (x.min === x.max ? 0 : x.max - x.min - 1));

console.log(minMax);
console.log(numSol);
