import { describe, it, expect } from 'vitest';
import {
  MatchStrategy,
  escapeForRegExp,
  createSearchRegExp,
  findMatchByIncreasingDepth,
} from './searchUtils';

describe('escapeForRegExp', () => {
  it('should escape special RegExp characters', () => {
    const specialChars = '.*+?^${}()|[]\\';
    const escapedSpecialChars = '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\';
    expect(escapeForRegExp(specialChars)).toEqual(escapedSpecialChars);
  });

  it('should return the same string if no special characters are present', () => {
    const normalString = 'Hello World';
    expect(escapeForRegExp(normalString)).toEqual(normalString);
  });

  it('should escape a string with mixed special and normal characters', () => {
    const mixedString = 'Hello.*+?^${}()|[]\\World';
    const escapedMixedString = 'Hello\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\World';
    expect(escapeForRegExp(mixedString)).toEqual(escapedMixedString);
  });

  it('should correctly handle empty strings', () => {
    const emptyString = '';
    expect(escapeForRegExp(emptyString)).toEqual(emptyString);
  });

  it('should correctly handle string start with space', () => {
    const stringStartEscape = ' String';
    expect(escapeForRegExp(stringStartEscape)).toEqual(stringStartEscape);
  });

  it('should correctly escape string with mobile phone', () => {
    const telephoneString = '+3726543210';
    const escapedTelephoneString = '\\+3726543210';
    expect(escapeForRegExp(telephoneString)).toEqual(escapedTelephoneString);
  });

  it('should correctly escape string with email', () => {
    const emailString = 'test@email.com';
    const escapedEmailString = 'test@email\\.com';
    expect(escapeForRegExp(emailString)).toEqual(escapedEmailString);
  });
});

describe('createSearchRegExp', () => {
  describe('matchStrategy: MatchStrategy.AnyMatch', () => {
    it('should match everything with an empty search phrase', () => {
      const searchRegExp = createSearchRegExp('', MatchStrategy.AnyMatch);
      expect('Any string should match').toMatch(searchRegExp);
      expect('').toMatch(searchRegExp);
    });

    it('should be case insensitive', () => {
      const phrase = 'Lorem';
      const searchRegExp = createSearchRegExp(phrase, MatchStrategy.AnyMatch);
      expect('IpsumLOREM').toMatch(searchRegExp);
      expect('lorem ipsum').toMatch(searchRegExp);
    });

    it('should correct handle RegExp characters', () => {
      const phrase = 'Hello.*+?^${}()|[]\\World';
      const searchRegExp = createSearchRegExp(phrase, MatchStrategy.AnyMatch);
      expect('Hello.*+?^${}()|[]\\World').toMatch(searchRegExp);
      expect('Some random text ${}()|[]\\.*+?^').not.toMatch(searchRegExp);
    });
  });

  describe('matchStrategy: MatchStrategy.StartString', () => {
    it('should match everything with an empty search phrase', () => {
      const searchRegExp = createSearchRegExp('', MatchStrategy.StartString);
      expect('Any string should match').toMatch(searchRegExp);
      expect('').toMatch(searchRegExp);
    });

    it('should be case insensitive', () => {
      const phrase = 'Lorem';
      const searchRegExp = createSearchRegExp(phrase, MatchStrategy.StartString);
      expect('lorem ipsum').toMatch(searchRegExp);
      expect('LOreMSomeText').toMatch(searchRegExp);
      expect('Some random text').not.toMatch(searchRegExp);
    });

    it('should correct handle RegExp characters', () => {
      const phrase = 'Hello.*+?^${}()|[]\\World';
      const searchRegExp = createSearchRegExp(phrase, MatchStrategy.StartString);
      expect('Hello.*+?^${}()|[]\\World').toMatch(searchRegExp);
      expect('.*+?^${}()|[]\\ Some random text').not.toMatch(searchRegExp);
    });

    it('should match strings starting with the phrase', () => {
      const phrase = 'start';
      const searchRegExp = createSearchRegExp(phrase, MatchStrategy.StartString);
      expect('start here').toMatch(searchRegExp);
      expect('Please start here').not.toMatch(searchRegExp);
    });
  });

  describe('matchStrategy: MatchStrategy.StartWord', () => {
    it('should match any word with an empty search phrase', () => {
      const searchRegExp = createSearchRegExp('', MatchStrategy.StartWord);
      expect('Any word should match').toMatch(searchRegExp);
      expect('').not.toMatch(searchRegExp);
    });

    it('should be case insensitive', () => {
      const phrase = 'Lorem';
      const searchRegExp = createSearchRegExp(phrase, MatchStrategy.StartWord);
      expect('impsum LOREM').toMatch(searchRegExp);
      expect('Some random text').not.toMatch(searchRegExp);
    });

    it('should correct handle RegExp characters', () => {
      const phrase = 'Hello.*+?^${}()|[]\\World';
      const searchRegExp = createSearchRegExp(phrase, MatchStrategy.StartWord);
      expect('Start from word Hello.*+?^${}()|[]\\World').toMatch(searchRegExp);
      expect('Some random text .*+?^${}()|[]\\').not.toMatch(searchRegExp);
    });

    it('should match strings starting with the phrase', () => {
      const phrase = 'start';
      const searchRegExp = createSearchRegExp(phrase, MatchStrategy.StartWord);
      expect('Match Start here').toMatch(searchRegExp);
      expect('Please notStart here').not.toMatch(searchRegExp);
    });
  });
});

describe('findMatchByIncreasingDepth', () => {
  const stringsArray = [
    'Excom OU',
    'Alex Daimler',
    'testree',
    'flower computer',
    'second tree tree',
    'nbH',
    'dog markable',
    'yNl',
    'dave@simple.com',
    'dave@easy.com',
    '+1 448 498 5104',
    'deephouse',
    'tree flower',
    '+1(679)858-7409',
    'carol@simple.com',
    'book house',
    'vRi',
    'alice@simple.com',
    '123alice@email.com',
    'flower',
    'bob@simple.com',
    'alice@simple.com',
    'C',
    '+18211856731',
    'some email startWord@email.com',
  ];

  describe('with empty array', () => {
    const matchTypes = [MatchStrategy.AnyMatch, MatchStrategy.StartWord, MatchStrategy.StartString];

    test.each(matchTypes)(
      'should return "-1" for maxDepth: %s with an empty array',
      (matchType) => {
        expect(findMatchByIncreasingDepth('some text', [], matchType)).toEqual(-1);
      }
    );
  });

  describe('preference for starting string matches', () => {
    const testCases = [MatchStrategy.AnyMatch, MatchStrategy.StartWord, MatchStrategy.StartString];

    test.each(testCases)(
      'should prioritize match at the start of the string for maxDepth: %s',
      (maxDepth) => {
        expect(findMatchByIncreasingDepth('tree', stringsArray, maxDepth)).toEqual(12);
      }
    );
  });

  describe('Max depth: Any match', () => {
    const maxDepth = MatchStrategy.AnyMatch;

    it('should find first match: Start word', () => {
      expect(findMatchByIncreasingDepth('house', stringsArray, maxDepth)).toEqual(15);
    });

    it('should find first match: Any', () => {
      expect(findMatchByIncreasingDepth('xcom', stringsArray, maxDepth)).toEqual(0);
    });

    it('should not find any match and return "-1"', () => {
      expect(findMatchByIncreasingDepth('not match', stringsArray, maxDepth)).toEqual(-1);
    });

    it('should find middle part email correctly', () => {
      expect(findMatchByIncreasingDepth('ob@simple', stringsArray, maxDepth)).toEqual(20);
    });

    it('should find middle part telephone number correctly', () => {
      expect(findMatchByIncreasingDepth('858', stringsArray, maxDepth)).toEqual(13);
    });
  });

  describe('Max depth: Start word', () => {
    const maxDepth = MatchStrategy.StartWord;

    it('should find first match: Start word', () => {
      expect(findMatchByIncreasingDepth('house', stringsArray, maxDepth)).toEqual(15);
    });

    it('should return "-1" when no matches start with the query string or word', () => {
      expect(findMatchByIncreasingDepth('xcom', stringsArray, maxDepth)).toEqual(-1);
    });

    it('should find start email correctly', () => {
      expect(findMatchByIncreasingDepth('startWord@e', stringsArray, maxDepth)).toEqual(24);
    });

    it('should find a segment of a formatted telephone number', () => {
      expect(findMatchByIncreasingDepth('740', stringsArray, maxDepth)).toEqual(13);
      expect(findMatchByIncreasingDepth('18211', stringsArray, maxDepth)).toEqual(23);
    });
  });

  describe('Max depth: Start String', () => {
    const maxDepth = MatchStrategy.StartString;

    it('should return "-1" when no matches start with the query string', () => {
      expect(findMatchByIncreasingDepth('house', stringsArray, maxDepth)).toEqual(-1);
    });

    it('should find string starting from email', () => {
      expect(findMatchByIncreasingDepth('dave@simple', stringsArray, maxDepth)).toEqual(8);
    });
  });
});
