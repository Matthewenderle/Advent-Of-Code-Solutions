export const removeWhitespace = (string) => string.replace(/\s/g, '');

export const getDistinctCharacters = (string) => [...new Set(string)];

export const countOccurrences = (string, character) => string.split(character).length - 1;
