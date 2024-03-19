export enum SearchStrategy {
  StartString = 'startString',
  StartWord = 'startWord',
  AnyMatch = 'anyMatch',
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function firstMatchDepthFinder(
  phrase: string,
  searchArray: string[],
  maxDepth: SearchStrategy
) {
  /**
   * Searches for the first occurrence in an array of strings that matches the given phrase
   * according to a specified search strategy. The function uses a cascading approach to match
   * the phrase with the array elements, starting from the strictest criterion to the least strict.
   *
   * @param {string} phrase - The phrase to search for in the array.
   * @param {string[]} searchArray - The array of strings to search within.
   * @param {SearchStrategy} maxDepth - The maximum depth of the search, which determines how
   *        lenient the matching should be. It can be 'startString' for matches that start with
   *        the phrase, 'startWord' for matches where the phrase starts at the beginning of any
   *        word in the string, and 'anyMatch' for any occurrence of the phrase within the string.
   *
   * @returns {number} The index of the first matching element in the array. If no match is found,
   *         the function returns -1.
   */

  const NOT_FOUND = -1;
  const escapePhrase = escapeRegExp(phrase);
  const patterns = [];
  const startStringRegExp = new RegExp(`^${escapePhrase}`, 'i');

  patterns.push(startStringRegExp);
  if (maxDepth === SearchStrategy.StartWord || maxDepth === SearchStrategy.AnyMatch) {
    const startWordRegExp = new RegExp(`\\b${escapePhrase}`, 'i');
    patterns.push(startWordRegExp);
  }
  if (maxDepth === SearchStrategy.AnyMatch) {
    const anyMatchRegExp = new RegExp(escapePhrase, 'i');
    patterns.push(anyMatchRegExp);
  }

  for (const patternRegExp of patterns) {
    for (let i = 0; i < searchArray.length; i++) {
      if (patternRegExp.test(searchArray[i])) {
        return i;
      }
    }
  }

  return NOT_FOUND;
}
