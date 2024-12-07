import { fileToArray } from '../../utils/file.js';
import { findCoordinates, inBounds, isOnBorder, goToNextCoordinate, getNthCoordinate } from '../../utils/arrays.js';

const modes = {
  dev: true,
  real: false,
};

const correctDevPart1 = 41;
const correctDevPart2 = 6;

export default function (date) {
  const [year, day] = date.split('/');
  console.log(`Running solution for day ${day} of ${year}`);
  console.log(`Page:  https://adventofcode.com/${year}/day/${day}`);
  console.log(`Input: https://adventofcode.com/${year}/day/${day}/input\n`);

  const devFile = modes.dev ? fileToArray(`${year}/day-${day}/input-dev.txt`) : null;
  const inputFile = modes.real ? fileToArray(`${year}/day-${day}/input.txt`) : null;

  const devPart1 = modes.dev ? part1Solution(devFile) : 'na';
  const devPart2 = modes.dev ? part2Solution(devFile) : 'na';

  const part1 = modes.real ? part1Solution(inputFile) : 'na';
  const part2 = modes.real ? part2Solution(inputFile) : 'na';

  if (!modes.real) console.log(`⚠️   Skipping real solution\n`);

  console.log('Solutions: (Real :: Dev)');
  console.log(`  Part 1:  ${part1} :: ${devPart1} ${devPart1 === correctDevPart1 ? '✅' : `❌ (${correctDevPart1})`}`);
  console.log(`  Part 2:  ${part2} :: ${devPart2} ${devPart2 === correctDevPart2 ? '✅' : `❌ (${correctDevPart2})`}`);
}

const getNextCoordinate = (coordinate, orientation) => {
  switch (orientation) {
    case 0:
      return { x: coordinate.x, y: coordinate.y - 1 }; // up
    case 1:
      return { x: coordinate.x + 1, y: coordinate.y }; // right
    case 2:
      return { x: coordinate.x, y: coordinate.y + 1 }; // down
    case 3:
      return { x: coordinate.x - 1, y: coordinate.y }; // left
  }
};

const part1Solution = (inputFile) => {
  const visited = new Set();

  const csv = inputFile.map((x) => x.split(''));

  const cursorStartCoords = findCoordinates(csv, '^');
  visited.add([cursorStartCoords.x, cursorStartCoords.y].join(','));

  let cursorInBounds = inBounds(cursorStartCoords, csv);
  let cursorCoordinate = cursorStartCoords;
  let cursorDirection = 0;

  while (cursorInBounds) {
    const nextCoord = getNextCoordinate(cursorCoordinate, cursorDirection);

    cursorInBounds = inBounds(nextCoord, csv);

    if (isOnBorder(nextCoord, csv) && csv[nextCoord.y][nextCoord.x] === '.') {
      visited.add([nextCoord.x, nextCoord.y].join(','));
      break;
    }

    const nextStep = csv[nextCoord.y][nextCoord.x];

    if (nextStep === '#') {
      cursorDirection = (cursorDirection + 1) % 4;
    } else {
      cursorCoordinate = nextCoord;
    }

    if (csv[cursorCoordinate.y][cursorCoordinate.x] !== '#') {
      csv[cursorCoordinate.y][cursorCoordinate.x] = 'X';
    }

    // console.log(csv.map((x) => x.join('')).join('\n'));
    // console.log('\n\n');

    visited.add([cursorCoordinate.x, cursorCoordinate.y].join(','));
  }

  return visited.size;
};

const part2Solution = (inputFile) => {
  let loopCount = 0;
  const csv = inputFile.map((x) => x.split(''));
  const cursorStartCoords = findCoordinates(csv, '^');

  const lastPosition = { x: csv[0].length, y: csv.length };

  let obstructionPosition = { x: 0, y: 0 };
  const pathSymbols = ['│', '─', '│', '─'];
  const activePathSymbol = '░';

  for (let i = 0; i < csv.length * csv[0].length; i++) {
    obstructionPosition = getNthCoordinate(csv, i, true);

    let cursorCoordinate = cursorStartCoords;
    let cursorDirection = 0;
    let previousCursor = {
      x: cursorStartCoords.x,
      y: cursorStartCoords.y,
      symbol: csv[cursorStartCoords.y][cursorStartCoords.x],
    };

    if (cursorCoordinate.x === obstructionPosition.x && cursorCoordinate.y === obstructionPosition.y) {
      continue;
    }

    const cleanGrid = csv.map((line) => [...line]);

    let turnCoords = new Set();

    let cursorInBounds = inBounds(cursorStartCoords, csv);
    let onBounds = false;

    while (cursorInBounds && !onBounds) {
      let nextCoord = getNextCoordinate(cursorCoordinate, cursorDirection);
      const newGrid = [...cleanGrid];

      cursorInBounds = inBounds(nextCoord, newGrid);
      onBounds =
        cursorCoordinate.x < 0 ||
        cursorCoordinate.x >= csv[0].length ||
        cursorCoordinate.y < 0 ||
        cursorCoordinate.y >= csv.length;

      newGrid[previousCursor.y][previousCursor.x] =
        previousCursor.symbol || newGrid[previousCursor.y][previousCursor.x];

      newGrid[obstructionPosition.y][obstructionPosition.x] = 'O';

      const nextStep = newGrid[nextCoord.y][nextCoord.x];

      if (['#', 'O'].includes(nextStep)) {
        turnCoords.add(`${[cursorCoordinate.x, cursorCoordinate.y].join(',')}/${cursorDirection}`);
        cursorDirection = (cursorDirection + 1) % 4;
        newGrid[cursorCoordinate.y][cursorCoordinate.x] = '┼';
      } else if (nextStep !== '#' && !pathSymbols.includes(nextStep)) {
        cursorCoordinate = nextCoord;
        newGrid[cursorCoordinate.y][cursorCoordinate.x] = pathSymbols[cursorDirection];
      } else if (pathSymbols.includes(nextStep)) {
        cursorCoordinate = nextCoord;
        newGrid[cursorCoordinate.y][cursorCoordinate.x] = '┼';
      }

      nextCoord = getNextCoordinate(cursorCoordinate, cursorDirection);
      if (isOnBorder(nextCoord, newGrid) && newGrid[nextCoord.y][nextCoord.x] === '.') {
        break;
      }
      if (turnCoords.has(`${[cursorCoordinate.x, cursorCoordinate.y].join(',')}/${cursorDirection}`)) {
        loopCount++;
        break;
      }

      previousCursor = {
        x: cursorCoordinate.x,
        y: cursorCoordinate.y,
        symbol: newGrid[cursorCoordinate.y][cursorCoordinate.x],
      };

      newGrid[cursorCoordinate.y][cursorCoordinate.x] = activePathSymbol;
      // console.log(newGrid.map((x) => x.join('')).join('\n'));
      // console.log('\n\n');

      if (cursorCoordinate === lastPosition) {
        break;
      }
    }
  }

  return loopCount;
};
