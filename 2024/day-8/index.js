import { fileToArray } from '../../utils/file.js';
import { getDistinctCharacters, countOccurrences } from '../../utils/strings.js';
import { findCoordinates, inBounds, getLineCoordinates } from '../../utils/arrays.js';

const modes = {
  dev: true,
  real: true,
};

const correctDevPart1 = 14;
const correctDevPart2 = 34;

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

const findNextLetter = (map, letter) => {
  const nextLetter = map.find((char) => char > letter);
  return nextLetter;
};

const part1Solution = (inputFile) => {
  const towers = getDistinctCharacters(inputFile.join('').replace(/\./g, ''));
  let towerMap = inputFile.map((x) => x.split(''));
  let mapString = towerMap.map((row) => row.join('')).join('\n');
  let antinodes = 0;

  const mapGrid = mapString.split('\n').map((row) => row.split(''));
  const towerCoordinates = [];

  towers.forEach((tower) => {
    const charCount = mapString.split(tower).length - 1;
    for (let i = 0; i < charCount; i++) {
      const coord = findCoordinates(towerMap, tower);
      towerCoordinates.push({ char: tower, coord });
      towerMap[coord.y][coord.x] = '+';
    }
  });

  towerMap = inputFile.map((x) => x.split(''));
  mapString = towerMap.map((row) => row.join('')).join('\n');

  const outputGrid = [...mapGrid];

  towers.forEach((tower) => {
    const filteredTowers = towerCoordinates.filter((x) => x.char === tower);

    for (let i = 0; i < filteredTowers.length - 1; i++) {
      for (let j = i + 1; j < filteredTowers.length; j++) {
        const diffX = filteredTowers[j].coord.x - filteredTowers[i].coord.x;
        const diffY = filteredTowers[j].coord.y - filteredTowers[i].coord.y;

        const coordA = { x: filteredTowers[i].coord.x - diffX, y: filteredTowers[i].coord.y - diffY };
        const coordB = { x: filteredTowers[j].coord.x + diffX, y: filteredTowers[j].coord.y + diffY };

        if (inBounds(coordA, towerMap)) {
          outputGrid[coordA.y] && (outputGrid[coordA.y][coordA.x] = '░');
        }
        if (inBounds(coordB, towerMap)) {
          outputGrid[coordB.y] && (outputGrid[coordB.y][coordB.x] = '░');
        }
      }
    }
  });

  const output = outputGrid.map((row) => row.join('')).join('\n');

  // console.log(output, '\n\n');
  antinodes = output.split('░').length - 1 + output.split('▓').length - 1;

  return antinodes;
};

const part2Solution = (inputFile) => {
  const towers = getDistinctCharacters(inputFile.join('').replace(/\./g, ''));
  let towerMap = inputFile.map((x) => x.split(''));
  let mapString = towerMap.map((row) => row.join('')).join('\n');
  let antinodes = 0;

  const mapGrid = mapString.split('\n').map((row) => row.split(''));
  const towerCoordinates = [];

  towers.forEach((tower) => {
    const charCount = mapString.split(tower).length - 1;
    for (let i = 0; i < charCount; i++) {
      const coord = findCoordinates(towerMap, tower);
      towerCoordinates.push({ char: tower, coord });
      towerMap[coord.y][coord.x] = '+';
    }
  });

  towerMap = inputFile.map((x) => x.split(''));
  mapString = towerMap.map((row) => row.join('')).join('\n');

  const outputGrid = [...mapGrid];

  towers.forEach((tower) => {
    const filteredTowers = towerCoordinates.filter((x) => x.char === tower);

    for (let i = 0; i < filteredTowers.length - 1; i++) {
      for (let j = i + 1; j < filteredTowers.length; j++) {
        const diffX = filteredTowers[j].coord.x - filteredTowers[i].coord.x;
        const diffY = filteredTowers[j].coord.y - filteredTowers[i].coord.y;

        let coordA = { x: filteredTowers[i].coord.x - diffX, y: filteredTowers[i].coord.y - diffY };
        let coordB = { x: filteredTowers[j].coord.x + diffX, y: filteredTowers[j].coord.y + diffY };

        const coords = getLineCoordinates(filteredTowers[i].coord, filteredTowers[j].coord, towerMap);

        coords.forEach((coord, index) => {
          if (!inBounds(coord, towerMap)) return;

          const harmonicA = { x: coordA.x - diffX * index, y: coordA.y - diffY * index };
          const harmonicB = { x: coordB.x + diffX * index, y: coordB.y + diffY * index };

          if (inBounds(harmonicA, towerMap)) outputGrid[harmonicA.y] && (outputGrid[harmonicA.y][harmonicA.x] = '░');
          if (inBounds(harmonicB, towerMap)) outputGrid[harmonicB.y] && (outputGrid[harmonicB.y][harmonicB.x] = '░');

          if (inBounds(coord, towerMap) && towerMap[coord.y][coord.x] === tower) {
            outputGrid[coord.y][coord.x] = '▓';
          }
          // console.log(outputGrid.map((row) => row.join('')).join('\n'));
        });
      }
    }
  });

  const output = outputGrid.map((row) => row.join('')).join('\n');

  console.log(output, '\n\n');
  antinodes = output.split('░').length - 1 + output.split('▓').length - 1;

  return antinodes;
};
