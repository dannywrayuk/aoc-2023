// https://adventofcode.com/2023/day/2

const file = Bun.file("./src/2/data.txt");
const text = await file.text();
const lines = text.split("\n");

type CubeSet = {
  red: number;
  green: number;
  blue: number;
};

type Game = CubeSet[];

// parse data

const parseColors = (cubeSet: string[]) => {
  const data: CubeSet = {
    red: 0,
    green: 0,
    blue: 0,
  };
  cubeSet.forEach((color) => {
    const [number, colorId] = color.trim().split(" ");
    data[colorId as keyof CubeSet] = Number(number);
  });
  return data;
};

const gameTable: Game[] = lines.map((line) => {
  const [id, gameData] = line.split(":");
  const cubeSets = gameData.split(";");
  return cubeSets.map((cubeSet) => parseColors(cubeSet.split(",")));
});

// calculate minimum

const minimum = gameTable.map((game) =>
  game.reduce(
    (minimum, next) => {
      if (minimum.red < next.red) minimum.red = next.red;
      if (minimum.green < next.green) minimum.green = next.green;
      if (minimum.blue < next.blue) minimum.blue = next.blue;
      return minimum;
    },
    { red: 0, green: 0, blue: 0 }
  )
);

const power = (set: CubeSet) => set.red * set.blue * set.green;

const sumOfPower = minimum.reduce((sum, next) => sum + power(next), 0);

console.log(sumOfPower);
