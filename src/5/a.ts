// https://adventofcode.com/2023/day/5

const file = Bun.file("./src/5/data.txt");
const text = await file.text();

const dataArray = text.split("\n\n").map((mapType) => {
  const mapData = mapType.replaceAll(": ", ":\n").split(":\n");
  return mapData[1].split("\n").map((x) =>
    x
      .trim()
      .split(" ")
      .map((x) => Number(x))
  );
});

const data = { seeds: dataArray[0][0], maps: dataArray.slice(1) };

const applyMap = (input: number, maps: number[][]) => {
  const mapRange = maps.find(
    (map) => input >= map[1] && input < map[1] + map[2]
  );
  if (mapRange) return mapRange[0] + (input - mapRange[1]);
  return input;
};

const locations = data.seeds.map((seed) => {
  console.log("seed", seed);

  return data.maps.reduce((result, next) => {
    result = applyMap(result, next);
    console.log(result);
    return result;
  }, seed);
});

console.log("min:", Math.min(...locations));
