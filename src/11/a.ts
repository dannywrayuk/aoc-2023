// https://adventofcode.com/2023/day/11

const file = Bun.file("./src/11/data.txt");
const text = await file.text();

const inRows = text.split("\n");

const expandedRows = inRows.flatMap((row) => {
  if (row.replaceAll(".", "").length === 0) {
    return [row, row];
  }
  return row;
});

const expandedColumns = new Array(inRows[0].length)
  .fill("")
  .map((_, id) => expandedRows.map((x) => x.charAt(id)).join(""))
  .flatMap((col) => {
    if (col.replaceAll(".", "").length === 0) {
      return [col, col];
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

const distance = (a: number[], b: number[]) => {
  const y = Math.abs(a[0] - b[0]);
  const x = Math.abs(a[1] - b[1]);
  return x + y;
};

const distances = galaxyPairs.map((p) => [p[2], distance(p[0], p[1])]);

const sumArray = <T>(x: Array<T>) =>
  x.reduce((sum, next) => Number(sum) + Number(next), 0);

const sum = sumArray(distances.map((x) => x[1]));

console.log(sum);
