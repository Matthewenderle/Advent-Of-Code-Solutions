import { fileToArray } from '../../utils/file.js';

const modes = {
  dev: true,
  real: true,
};

const correctDevPart1 = 2;
const correctDevPart2 = 4;

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

const part1Solution = (inputFile) => {
  let solution = 0;

  const rows = inputFile.map((line) => line.split(' ').map(Number));

  rows.forEach((row) => {
    if (isSafe(row)) {
      solution += 1;
    }
  });

  return solution;
};

const part2Solution = (inputFile) => {
  let solution = 0;

  const rows = inputFile.map((line) => line.split(' ').map(Number));

  rows.forEach((row) => {
    if (isSafe(row)) {
      solution += 1;
    } else {
      let fixed = false;
      for (let i = 0; i < row.length; i++) {
        const newRow = row.slice(0, i).concat(row.slice(i + 1));
        if (isSafe(newRow)) {
          fixed = true;
          break;
        }
      }
      if (fixed) solution += 1;
    }
  });

  return solution;
};

function isSafe(row) {
  if (row.length < 2) return false;
  let direction = null;
  for (let i = 0; i < row.length - 1; i++) {
    const diff = row[i + 1] - row[i];
    if (Math.abs(diff) > 3 || Math.abs(diff) < 1) return false;
    let newDirection = diff > 0 ? 'up' : diff < 0 ? 'down' : null;
    if (newDirection) {
      if (!direction) direction = newDirection;
      else if (direction !== newDirection) return false;
    }
  }
  return true;
}
