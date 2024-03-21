import { OptionType } from 'types/common';

export enum MatchStrategy {
  StartString = 'startString',
  StartWord = 'startWord',
  AnyMatch = 'anyMatch',
}

export const escapeForRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const createSearchRegExp = (phrase: string, matchStrategy: MatchStrategy) => {
  const escapePhrase = escapeForRegExp(phrase);
  switch (matchStrategy) {
    case MatchStrategy.StartString:
      return new RegExp(`^${escapePhrase}`, 'i');
    case MatchStrategy.StartWord:
      return new RegExp(`\\b${escapePhrase}`, 'i');
    case MatchStrategy.AnyMatch:
      return new RegExp(escapePhrase, 'i');
  }
};

export const findFirstMatchDepth = (
  phrase: string,
  searchArray: string[],
  maxDepth: MatchStrategy
) => {
  /**
   * Performs a search for the first index in a string array where the element matches a given phrase,
   * beginning with the strictest search criterion and gradually becoming more lenient if no match is
   * found, regardless of the initially specified `maxDepth`. This means the search starts with the most
   * strict level ('startString') and progresses through 'startWord' to 'anyMatch' until a match is found
   * or all levels are exhausted.
   *
   * @param {string} phrase - The phrase to search for.
   * @param {string[]} searchArray - Array of strings to search.
   * @param {MatchStrategy} maxDepth - Determines the initial leniency of the match, but the search starts
   *        at the highest strictness and decreases if no match is found.
   * @returns {number} Index of the first match according to the cascading search criteria, or -1 if no match is found.
   */

  const NOT_FOUND = -1;
  const patterns = [];
  const startStringRegExp = createSearchRegExp(phrase, MatchStrategy.StartString);
  patterns.push(startStringRegExp);

  patterns.push(startStringRegExp);
  if (maxDepth === MatchStrategy.StartWord || maxDepth === MatchStrategy.AnyMatch) {
    const startWordRegExp = createSearchRegExp(phrase, MatchStrategy.StartWord);
    patterns.push(startWordRegExp);
  }
  if (maxDepth === MatchStrategy.AnyMatch) {
    const anyMatchRegExp = createSearchRegExp(phrase, MatchStrategy.AnyMatch);
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
};

export const filterOptions = (
  phrase: string,
  options: OptionType[],
  matchStrategy: MatchStrategy
) => {
  const patternRegExp = createSearchRegExp(phrase, matchStrategy);
  return options.filter((option) => {
    return patternRegExp.test(option.label);
  });
};
