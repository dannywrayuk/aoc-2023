// https://adventofcode.com/2023/day/8

const file = Bun.file("./src/8/data.txt");
const text = await file.text();

const [stepData, nodeData] = text.split("\n\n");

type Node = { L: string; R: string };

const graph = nodeData.split("\n").reduce((result, next) => {
  const splitNext = next.split("=");
  const id = splitNext[0].trim();
  const [lNode, rNode] = splitNext[1]
    .replace("(", "")
    .replace(")", "")
    .trim()
    .split(", ");
  result[id] = { L: lNode, R: rNode };
  return result;
}, {} as Record<string, Node>);

console.log(graph);

const traverseUntil = (start: string, end: string) => {
  let currentNode = start;
  let count = 0;
  while (currentNode !== end) {
    const nextStep = stepData[count % stepData.length] as keyof Node;
    currentNode = graph[currentNode][nextStep];
    count++;
  }
  return count;
};

const stepCount = traverseUntil("AAA", "ZZZ");

console.log(stepCount);
