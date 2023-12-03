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

// test possibility

const proposal: CubeSet = {
  red: 12,
  green: 13,
  blue: 14,
};

const checkPossibility = (game: CubeSet[], test: CubeSet) => {
  return game.every(
    (set) =>
      set.red <= test.red && set.green <= test.green && set.blue <= test.blue
  );
};

const possibleGames = gameTable.map((game) => checkPossibility(game, proposal));

const sum = possibleGames.reduce(
  (sum, next, id) => (next ? sum + id + 1 : sum),
  0
);

console.log(sum);
