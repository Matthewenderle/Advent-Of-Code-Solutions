/**
 * Checks if the given coordinates are within the bounds of the provided 2D array.
 *
 * @param {(Object|Array)} coords - The coordinates to check. Can be an object with properties {x, y} or an array [x, y].
 * @param {Array} array - The 2D array to check the coordinates against.
 * @returns {boolean} True if the coordinates are within the bounds of the array, false otherwise.
 * @throws {Error} If the coordinates are null, not an object or array, or if the array is not a 2D array.
 */
export const inBounds = (coords, array) => {
  if (coords === null || (typeof coords !== 'object' && !Array.isArray(coords))) {
    throw new Error('Invalid coordinates. Must be an object {x,y} or an array.');
  }

  const [x, y] = Array.isArray(coords) ? coords : [coords.x, coords.y];

  if (!Array.isArray(array) || !array.every(Array.isArray)) {
    throw new Error('Invalid Array. Must be a 2D array.');
  }

  return x >= 0 && x < array[0].length && y >= 0 && y < array.length;
};

/**
 * Converts an array of strings into a CSV format.
 *
 * @param {Array<string>} array - The array of strings to convert.
 * @param {string} [delim=''] - The delimiter used to split each string in the array. Defaults to an empty string.
 * @returns {Array<Array<string>>} A 2D array representing the CSV format, where each sub-array is a column of the CSV.
 */
export const stringToCSV = (array, delim = '') => {
  let csv = [];

  array.forEach((line, index) => {
    const row = line.split(delim);
    row.forEach((cell, column) => {
      if (!csv[column]) {
        csv[column] = [];
      }
      csv[column].push(cell);
    });
  });
  return csv;
};

/**
 * Sorts an array in ascending or descending order.
 *
 * @param {Array<number|string>} array - The array to sort. Can contain numbers or strings.
 * @param {string} [order='ascending'] - The order to sort the array. Can be 'ascending' or 'descending'. Defaults to 'ascending'.
 * @returns {Array<number|string>} The sorted array.
 * @throws {Error} If the order is not 'ascending' or 'descending'.
 */
export const sortArray = (array, order = 'ascending') => {
  if (order !== 'ascending' && order !== 'descending') {
    throw new Error("Invalid order. Must be 'ascending' or 'descending'.");
  }

  return array.slice().sort((a, b) => {
    if (order === 'ascending') {
      return a > b ? 1 : -1;
    } else {
      return a < b ? 1 : -1;
    }
  });
};

/**
 * Sums all the numbers in an array.
 *
 * @param {Array<number>} array - The array of numbers to sum.
 * @returns {number} The sum of all the numbers in the array.
 * @throws {Error} If the array contains non-number elements.
 */
export const sum = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('Invalid input. Must be an array.');
  }

  return array.reduce((acc, val) => {
    if (typeof val !== 'number') {
      throw new Error('Invalid array element. Must be a number.');
    }
    return acc + val;
  }, 0);
};
