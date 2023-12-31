// https://adventofcode.com/2023/day/6

const file = Bun.file("./src/6/data.txt");
const text = await file.text();

const lines = text.split("\n").map((x) => x.split(":")[1].trim().split(/\s+/g));
const data = lines[0].map((x, id) => ({
  time: Number(x),
  distance: Number(lines[1][id]),
}));

// (time*t - t)t > distance

const minMax = data.map((x) => ({
  min: Math.floor((x.time - Math.sqrt(x.time * x.time - 4 * x.distance)) / 2),
  max: Math.ceil((x.time + Math.sqrt(x.time * x.time - 4 * x.distance)) / 2),
}));

const numSol = minMax.map((x) => (x.min === x.max ? 0 : x.max - x.min - 1));

const productArray = (x: number[]) => x.reduce((sum, next) => sum * next, 1);

const product = productArray(numSol);
console.log(minMax);
console.log(numSol);
console.log(product);
