import { fileToArray } from '../../utils/file.js';

const modes = {
  dev: true,
  real: true,
};

const correctDevPart1 = 3;
const correctDevPart2 = 6;

const POSITIONS = 99;

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

  const rotations = inputFile.map((line) => Number(line.substring(1) * (line[0] === 'L' ? -1 : 1)));

  let position = 50;

  rotations.forEach((rot) => {
    position = arithmeticInBounds(+position, rot);
    if (position === 0) solution += 1;
  });

  return solution;
};

const part2Solution = (inputFile) => {
  let solution = 0;
  let position = 50;

  const rotations = inputFile.map((line) => Number(line.substring(1) * (line[0] === 'L' ? -1 : 1)));

  rotations.forEach((rot) => {
    const { result, overlaps } = arithmeticInBounds(+position, rot, [0, POSITIONS], true);
    position = result;
    solution += overlaps;
    if (position === 0 && overlaps < 0) solution += 1;
  });

  return solution;
};

const arithmeticInBounds = (start, distance, bounds = [0, 99], returnOverlaps = false) => {
  const range = bounds[1] - bounds[0] + 1;
  const offset = start + distance - bounds[0];
  const result = (((offset % range) + range) % range) + bounds[0];

  if (returnOverlaps) {
    const endPosition = start + distance;
    let zeroHits = 0;

    if (distance > 0) {
      zeroHits = Math.floor(endPosition / range) - Math.floor(start / range);
    } else if (distance < 0) {
      zeroHits = Math.ceil(start / range) - Math.ceil(endPosition / range);
    }

    return { result, overlaps: zeroHits };
  } else {
    return result;
  }
};
