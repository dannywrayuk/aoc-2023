// https://adventofcode.com/2023/day/7

const file = Bun.file("./src/7/data.txt");
const text = await file.text();

const data = text.split("\n").map((x) => {
  const y = x.split(" ");
  return {
    hand: y[0],
    bid: Number(y[1]),
  };
});

// identify hand

const cardToId = (card: string) => {
  switch (card) {
    case "2":
      return 0;
    case "3":
      return 1;
    case "4":
      return 2;
    case "5":
      return 3;
    case "6":
      return 4;
    case "7":
      return 5;
    case "8":
      return 6;
    case "9":
      return 7;
    case "T":
      return 8;
    case "J":
      return 9;
    case "Q":
      return 10;
    case "K":
      return 11;
    case "A":
      return 12;
  }
  throw Error("unknown card");
};

const cardSpread = (hand: string) =>
  hand.split("").reduce((result, next) => {
    result[cardToId(next)] += 1;
    return result;
  }, Array(13).fill(0));

const handTypes = {
  fiveOfAKind: 6,
  fourOfAKind: 5,
  fullHouse: 4,
  threeOfAKind: 3,
  twoPairs: 2,
  onePair: 1,
  highCard: 0,
};

const spreadToType = (spread: number[]) => {
  if (spread.includes(5)) {
    console.log(spread);

    return handTypes.fiveOfAKind;
  }
  if (spread.includes(4)) {
    return handTypes.fourOfAKind;
  }
  if (spread.includes(3)) {
    if (spread.includes(2)) {
      return handTypes.fullHouse;
    }
    return handTypes.threeOfAKind;
  }
  if (spread.includes(2)) {
    if (spread.filter((x) => x !== 0).length === 3) {
      return handTypes.twoPairs;
    }
    return handTypes.onePair;
  }
  return handTypes.highCard;
};

const withRank = data.map((x) => ({
  ...x,
  handType: spreadToType(cardSpread(x.hand)),
}));

// sort by hand

const compareHighestCard = (a: string, b: string, id = 0): number => {
  if (id >= a.length) throw Error("unhandled draw");
  const valueA = cardToId(a.charAt(id));
  const valueB = cardToId(b.charAt(id));
  if (valueA !== valueB) return valueA - valueB;
  return compareHighestCard(a, b, id + 1);
};

const ranked = withRank
  .sort((a, b) =>
    a.handType === b.handType
      ? compareHighestCard(a.hand, b.hand)
      : a.handType - b.handType
  )
  .map((x, id) => ({ ...x, rank: id + 1 }));

// console.log(ranked);

const totalWinnings = ranked.reduce((result, next) => {
  result += next.bid * next.rank;
  return result;
}, 0);

console.log(totalWinnings);
