import { fileToArray } from '../../utils/file.js';
import { sum } from '../../utils/arrays.js';
import { findOperands } from '../../utils/math.js';

export default function (date) {
  const [year, day] = date.split('/');
  console.log(`Running solution for day ${day} of ${year}`);
  console.log(`https://adventofcode.com/2024/day/7`);

  const modes = {
    dev: true,
    real: true,
  };

  const devFile = modes.dev ? fileToArray(`${year}/day-${day}/input-dev.txt`) : null;
  const inputFile = modes.real ? fileToArray(`${year}/day-${day}/input.txt`) : null;

  const devPart1 = modes.dev ? part1Solution(devFile) : 'na';
  const devPart2 = modes.dev ? part2Solution(devFile) : 'na';

  const part1 = modes.real ? part1Solution(inputFile) : 'na';
  const part2 = modes.real ? part2Solution(inputFile) : 'na';

  const correctDevPart1 = 3749;
  const correctDevPart2 = 11387;

  console.log('Solutions: (Real / Dev)');
  console.log(`  Part 1:  ${part1} :: ${devPart1} ${devPart1 === correctDevPart1 ? '✅' : `❌ (${correctDevPart1})`}`);
  console.log(`  Part 2:  ${part2} :: ${devPart2} ${devPart2 === correctDevPart2 ? '✅' : `❌ (${correctDevPart2})`}`);
}

const part1Solution = (inputFile) => {
  const equations = inputFile.map((x) => {
    const eq = x.replace(':', '').split(' ');
    const solution = eq.shift();
    return [solution, [...eq]];
  });

  const calibrationResult = [];

  equations.forEach((eq) => {
    const ops = findOperands(eq[1], eq[0], ['+', '*']);
    if (ops.length > 0) {
      calibrationResult.push(parseInt(eq[0]));
    }
  });

  return sum(calibrationResult);
};

const part2Solution = (inputFile) => {
  const equations = inputFile.map((x) => {
    const eq = x.replace(':', '').split(' ');
    const solution = eq.shift();
    return [solution, [...eq]];
  });

  const calibrationResult = [];

  equations.forEach((eq) => {
    const ops = findOperands(eq[1], eq[0], ['+', '*', '||']);
    if (ops.length > 0) {
      calibrationResult.push(parseInt(eq[0]));
    }
  });

  return sum(calibrationResult);
};
