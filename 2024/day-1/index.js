import { fileToArray } from '../../utils/file.js';
import { stringToCSV, sortArray, sum } from '../../utils/arrays.js';

export default function (date) {
  const [year, day] = date.split('/');
  console.log(`Running solution for day ${day} of ${year}`);

  const devFile = fileToArray(`${year}/day-${day}/input-dev.txt`);
  const inputFile = fileToArray(`${year}/day-${day}/input.txt`);

  const devPart1 = part1Solution(devFile);
  const devPart2 = part2Solution(devFile);

  const part1 = part1Solution(inputFile);
  const part2 = part2Solution(inputFile);

  console.log('Solutions: (Real / Dev)');
  console.log(`  Part 1:  ${part1} :: ${devPart1}`);
  console.log(`  Part 2:  ${part2} :: ${devPart2}`);
}

const part1Solution = (inputFile) => {
  const csv = stringToCSV(inputFile, '   ');
  const sortedListA = sortArray(csv[0]);
  const sortedListB = sortArray(csv[1]);

  const distances = [];

  sortedListA.forEach((a, i) => {
    distances.push(Math.abs(a - sortedListB[i]));
  });

  return sum(distances);
};

const part2Solution = (inputFile, devFile) => {
  const similarities = [];
  const csv = stringToCSV(inputFile, '   ');
  const sortedListA = sortArray(csv[0]);
  const sortedListB = sortArray(csv[1]);

  sortedListA.forEach((a, i) => similarities.push(a * sortedListB.filter((b) => b === a).length));

  return sum(similarities);
};
