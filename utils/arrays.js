// Import this with import { inBounds } from '../../utils/arrays.js';

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
