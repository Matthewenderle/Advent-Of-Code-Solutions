/**
 * Reads the content of a file and returns it as an array of strings,
 * where each element is a line from the file.
 *
 * @param {string} filePath - The path to the file to be read.
 * @returns {string[]} An array of strings, each representing a line from the file.
 */
import fs from 'fs';

export const fileToArray = (filePath) => {
  return fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');
};
