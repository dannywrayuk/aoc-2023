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

const seedsToRanges = (seedRanges: number[]) => {
  const seeds = [];
  for (let i = 0; i < seedRanges.length; i += 2) {
    seeds.push([seedRanges[i], seedRanges[i + 1]]);
  }
  return seeds;
};

const data = {
  seeds: seedsToRanges(dataArray[0][0]),
  maps: dataArray.slice(1),
};

console.log(data);

const useMap = (input: number, rangeMap: number[]) => {
  return rangeMap[0] - rangeMap[1] + input;
};

const getChangesFromMap = (input: number[], rangeMap: number[]) => {
  const data: Record<string, number[][]> = {
    changed: [],
    unchanged: [],
  };
  const inputStart = input[0];
  const inputSize = input[1];

  const mapStart = rangeMap[1];
  const mapSize = rangeMap[2];
  // | ^
  if (inputStart >= mapStart) {
    // | ^ |
    if (inputStart < mapStart + mapSize) {
      // | ^ | ^
      if (inputStart + inputSize > mapStart + mapSize) {
        // add
        data.changed.push([
          useMap(inputStart, rangeMap),
          mapStart + mapSize - inputStart,
        ]);
        data.unchanged.push([
          mapStart + mapSize,
          inputStart + inputSize - (mapStart + mapSize),
        ]);
      }
      // | ^ ^ |
      else {
        // add
        data.changed.push([useMap(inputStart, rangeMap), inputSize]);
      }
    }
    // | | ^
    else {
      data.unchanged.push(input);
    }
    // ^ |
  } else {
    // ^ | ^
    if (inputStart + inputSize > mapStart) {
      // ^ | | ^
      if (inputStart + inputSize > mapStart + mapSize) {
        // add
        data.unchanged.push([inputStart, mapStart - inputStart]);
        data.changed.push([useMap(mapStart, rangeMap), mapSize]);
        data.unchanged.push([
          mapStart + mapSize,
          inputStart + inputSize - (mapStart + mapSize),
        ]);
      }
      // ^ | ^ |
      else {
        // add
        data.unchanged.push([inputStart, mapStart - inputStart]);
        data.changed.push([
          useMap(mapStart, rangeMap),
          inputStart + inputSize - mapStart,
        ]);
      }
    }
    // ^ ^ |
    else {
      // ignore
      data.unchanged.push(input);
    }
  }
  return data;
};

const byFirstEntry = (a: any[], b: any[]) => a[0] - b[0];

const applyMapToRange = (input: number[][], maps: number[][]) => {
  const data: number[][] = [];
  const newInputs: number[][] = [];
  input.forEach((i) => {
    let isUnChanged = true;
    maps.forEach((nextMap) => {
      const { changed, unchanged } = getChangesFromMap(i, nextMap);
      if (changed.length > 0) {
        data.push(...changed);
        isUnChanged = false;
        newInputs.push(...unchanged);
      }
    });
    if (isUnChanged) {
      data.push(i);
    }
  });
  if (newInputs.length > 0) {
    data.push(...applyMapToRange(newInputs, maps));
  }
  return data;
};

const locations = data.maps.reduce((result, next) => {
  result = applyMapToRange(result, next);
  // console.log(result);
  return result;
}, data.seeds);

console.log(locations.sort(byFirstEntry)[0]);
