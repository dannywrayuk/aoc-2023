// https://adventofcode.com/2023/day/11

const file = Bun.file("./src/11/data.txt");
const text = await file.text();

const inRows = text.split("\n");

const expandedRows = inRows.map((row) => {
  if (row.replaceAll(".", "").length === 0) {
    return row.replaceAll(".", "~");
  }
  return row;
});

const expandedColumns = new Array(inRows[0].length)
  .fill("")
  .map((_, id) => expandedRows.map((x) => x.charAt(id)).join(""))
  .map((col) => {
    if (col.replaceAll(/[\.\~]/g, "").length === 0) {
      return col.replaceAll(".", "~");
    }
    return col;
  });

const expandedData = new Array(expandedRows.length)
  .fill("")
  .map((_, id) => expandedColumns.map((x) => x.charAt(id)));

const galaxyPos = expandedData.reduce((yResult, yNext, yId) => {
  const xPos = yNext.reduce((xResult, xNext, xId) => {
    if (xNext === "#") xResult.push(xId);
    return xResult;
  }, [] as number[]);
  if (xPos.length > 0) {
    yResult.push(...xPos.map((x) => [yId, x]));
  }
  return yResult;
}, [] as number[][]);

const galaxyPairs = galaxyPos.reduce((result, next, aId) => {
  if (aId < galaxyPos.length - 1) {
    const rest = galaxyPos.slice(aId + 1);
    result.push(...rest.map((x, bId) => [next, x, [aId, aId + bId + 1]]));
  }
  return result;
}, [] as number[][][]);

const sumArray = <T>(x: Array<T>) =>
  x.reduce((sum, next) => Number(sum) + Number(next), 0);

const expansionFactor = 1000000;

const distance = (a: number[], b: number[]) => {
  const y = sumArray(
    expandedColumns[a[1]]
      .split("")
      .slice(...[a[0], b[0]].sort((a, b) => a - b))
      .map((x) => (x === "~" ? expansionFactor : 1))
  );
  const x = sumArray(
    expandedData[a[0]]
      .slice(...[a[1], b[1]].sort((a, b) => a - b))
      .map((x) => (x === "~" ? expansionFactor : 1))
  );
  return x + y;
};

const distances = galaxyPairs.map((p) => [p[2], distance(p[0], p[1])]);

const sum = sumArray(distances.map((x) => x[1]));

console.log(sum);
