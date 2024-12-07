import { fileToArray } from '../../utils/file.js';

const modes = {
  dev: true,
  real: false,
};

const correctDevPart1 = 0;
const correctDevPart2 = 0;

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
  return solution;
};

const part2Solution = (inputFile) => {
  let solution = 0;
  return solution;
};
