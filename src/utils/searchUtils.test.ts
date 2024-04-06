import { describe, it, expect } from 'vitest';
import {
  MatchStrategy,
  escapeForRegExp,
  createSearchRegExp,
  findMatchByIncreasingDepth,
  filterOptions,
} from './searchUtils';
import { OptionType } from 'types/common';

describe('escapeForRegExp', () => {
  it('should escape special RegExp characters', () => {
    const specialChars = '.*+?^${}()|[]\\';
    const escapedSpecialChars = '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\';
    expect(escapeForRegExp(specialChars)).toBe(escapedSpecialChars);
  });

  it('should return the same string if no special characters are present', () => {
    const normalString = 'Hello World';
    expect(escapeForRegExp(normalString)).toBe(normalString);
  });

  it('should escape a string with mixed special and normal characters', () => {
    const mixedString = 'Hello.*+?^${}()|[]\\World';
    const escapedMixedString = 'Hello\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\World';
    expect(escapeForRegExp(mixedString)).toBe(escapedMixedString);
  });

  it('should correctly handle empty strings', () => {
    const emptyString = '';
    expect(escapeForRegExp(emptyString)).toBe(emptyString);
  });

  it('should correctly handle string start with space', () => {
    const stringStartEscape = ' String';
    expect(escapeForRegExp(stringStartEscape)).toBe(stringStartEscape);
  });

  it('should correctly escape string with mobile phone', () => {
    const telephoneString = '+3726543210';
    const escapedTelephoneString = '\\+3726543210';
    expect(escapeForRegExp(telephoneString)).toBe(escapedTelephoneString);
  });

  it('should correctly escape string with email', () => {
    const emailString = 'test@email.com';
    const escapedEmailString = 'test@email\\.com';
    expect(escapeForRegExp(emailString)).toBe(escapedEmailString);
  });
});

describe('createSearchRegExp', () => {
  describe('MatchStrategy.AnyMatch behavior', () => {
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
    });
  });

  describe('Behavior with MatchStrategy.StartString', () => {
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
    });
  });

  describe('Behavior with MatchStrategy.StartWord', () => {
    it('should match any word with an empty search phrase', () => {
      const searchRegExp = createSearchRegExp('', MatchStrategy.StartWord);
      expect('Any word should match').toMatch(searchRegExp);
      expect('another phrase').toMatch(searchRegExp);
    });

    it('should be case insensitive', () => {
      const phrase = 'Lorem';
      const searchRegExp = createSearchRegExp(phrase, MatchStrategy.StartWord);
      expect('impsum LOREM').toMatch(searchRegExp);
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
    });
  });
});

describe('findMatchByIncreasingDepth', () => {
  describe('Empty array behavior across matching depth strategies', () => {
    const matchingDepthStrategies = [
      MatchStrategy.AnyMatch,
      MatchStrategy.StartWord,
      MatchStrategy.StartString,
    ];

    test.each(matchingDepthStrategies)('should return index "-1" for maxDepth: %s', (maxDepth) => {
      expect(findMatchByIncreasingDepth('some text', [], maxDepth)).toBe(-1);
    });
  });

  describe('Precedence of "StartString" matches in varying match strategies', () => {
    const matchingDepthStrategies = [
      MatchStrategy.AnyMatch,
      MatchStrategy.StartWord,
      MatchStrategy.StartString,
    ];
    const testStringsArray = [
      '',
      'not match string',
      'match for anyPhrase',
      'match for word phrase',
      'phrase match start string',
      'phrase next match start string',
    ];

    test.each(matchingDepthStrategies)(
      '%s strategy should correctly prioritize "StartString" matches by returning index 4',
      (maxDepth) => {
        expect(findMatchByIncreasingDepth('phrase', testStringsArray, maxDepth)).toBe(4);
      }
    );
  });

  const stringsArray = [
    'Excom OU',
    'Alex Daimler',
    'testree',
    'flower computer',
    'second tree tree',
    '',
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

  describe('Behavior with MatchStrategy.AnyMatch', () => {
    const maxDepth = MatchStrategy.AnyMatch;

    it('should find first match: Start word and return index', () => {
      expect(findMatchByIncreasingDepth('house', stringsArray, maxDepth)).toBe(15);
    });

    it('should find first match: Any and return index', () => {
      expect(findMatchByIncreasingDepth('xcom', stringsArray, maxDepth)).toBe(0);
    });

    it('should not find any match and return index "-1"', () => {
      expect(findMatchByIncreasingDepth('not match', stringsArray, maxDepth)).toBe(-1);
    });

    it('should find middle part email correctly and return index', () => {
      expect(findMatchByIncreasingDepth('ob@simple', stringsArray, maxDepth)).toBe(20);
    });

    it('should find middle part telephone number correctly and return index', () => {
      expect(findMatchByIncreasingDepth('858', stringsArray, maxDepth)).toBe(13);
    });
  });

  describe('Behavior with MatchStrategy.StartWord', () => {
    const maxDepth = MatchStrategy.StartWord;

    it('should find first match: Start word and return index', () => {
      expect(findMatchByIncreasingDepth('house', stringsArray, maxDepth)).toBe(15);
    });

    it('should return index "-1" when no matches start with the query string or word', () => {
      expect(findMatchByIncreasingDepth('xcom', stringsArray, maxDepth)).toBe(-1);
    });

    it('should find start email correctly and return index', () => {
      expect(findMatchByIncreasingDepth('startWord@e', stringsArray, maxDepth)).toBe(24);
    });

    it('should find a segment of a formatted telephone number and return index', () => {
      expect(findMatchByIncreasingDepth('740', stringsArray, maxDepth)).toBe(13);
      expect(findMatchByIncreasingDepth('18211', stringsArray, maxDepth)).toBe(23);
    });
  });

  describe('Behavior with MatchStrategy.StartString', () => {
    const maxDepth = MatchStrategy.StartString;

    it('should return index "-1" when no matches start with the query string', () => {
      expect(findMatchByIncreasingDepth('house', stringsArray, maxDepth)).toBe(-1);
    });

    it('should find string starting from email and return index', () => {
      expect(findMatchByIncreasingDepth('dave@simple', stringsArray, maxDepth)).toBe(8);
    });
  });
});

describe('filterOptions', () => {
  const optionsArray: OptionType[] = [
    { label: 'Fish Moon Cloud', value: 'Fish Moon Cloud' },
    { label: 'Mountain Flower Bird', value: 'Mountain Flower Bird' },
    { label: 'Star Cloud Stone', value: 'Star Cloud Stone' },
    { label: 'Stone Mountain', value: 'Stone Mountain' },
    { label: 'Sun Bird', value: 'Sun Bird' },
    { label: 'Sky', value: 'Sky' },
    { label: 'Cloud Cloud', value: 'Cloud Cloud' },
    { label: 'Moon', value: 'Moon' },
    { label: 'Water Cloud', value: 'Water Cloud' },
    { label: 'Water Apple Sky', value: 'Water Apple Sky' },
    { label: 'Bird', value: 'Bird' },
    { label: 'Grass Mountain', value: 'Grass Mountain' },
    { label: 'Sun Fish', value: 'Sun Fish' },
    { label: 'Apple Apple', value: 'Apple Apple' },
    { label: 'Apple Water', value: 'Apple Water' },
  ];

  const matchingStrategies = [
    MatchStrategy.AnyMatch,
    MatchStrategy.StartWord,
    MatchStrategy.StartString,
  ];

  describe('Empty phrase behavior across match strategies', () => {
    test.each(matchingStrategies)(
      'should return unchanged array for matchStrategy: %s',
      (matchStrategy) => {
        expect(filterOptions('', optionsArray, matchStrategy)).toEqual(optionsArray);
      }
    );
  });

  describe('Empty optionsArray across match strategies', () => {
    test.each(matchingStrategies)(
      'should return empty array for matchStrategy: %s',
      (matchStrategy) => {
        expect(filterOptions('some random phrase', [], matchStrategy)).toEqual([]);
      }
    );
  });

  describe('Unmatching phrase across match strategies', () => {
    test.each(matchingStrategies)(
      'should return empty array for matchStrategy: %s',
      (matchStrategy) => {
        expect(filterOptions('some random phrase', optionsArray, matchStrategy)).toEqual([]);
      }
    );
  });

  describe('Case-insensitive filtering', () => {
    const testOptionsArray: OptionType[] = [
      { label: 'Bird magnetic', value: 'Bird magnetic' },
      { label: 'bird', value: 'bird' },
      { label: 'some random text', value: 'some random text' },
      { label: 'BIRD lorem', value: 'BIRD lorem' },
      { label: 'another random text', value: 'another random text' },
    ];
    const expectedFilteredOptionsArray: OptionType[] = [
      { label: 'Bird magnetic', value: 'Bird magnetic' },
      { label: 'bird', value: 'bird' },
      { label: 'BIRD lorem', value: 'BIRD lorem' },
    ];

    test.each(matchingStrategies)(
      'should be case-insensitive and return filtered array for matchStrategy: %s',
      (matchStrategy) => {
        expect(filterOptions('bird', testOptionsArray, matchStrategy)).toEqual(
          expectedFilteredOptionsArray
        );
        expect(filterOptions('Bird', testOptionsArray, matchStrategy)).toEqual(
          expectedFilteredOptionsArray
        );
        expect(filterOptions('BIRD', testOptionsArray, matchStrategy)).toEqual(
          expectedFilteredOptionsArray
        );
      }
    );
  });

  describe('Behavior with MatchStrategy.AnyMatch', () => {
    const anyMatchStrategy = MatchStrategy.AnyMatch;

    it('should return filtered array with all matches', () => {
      expect(filterOptions('loud', optionsArray, anyMatchStrategy)).toEqual([
        { label: 'Fish Moon Cloud', value: 'Fish Moon Cloud' },
        { label: 'Star Cloud Stone', value: 'Star Cloud Stone' },
        { label: 'Cloud Cloud', value: 'Cloud Cloud' },
        { label: 'Water Cloud', value: 'Water Cloud' },
      ]);
    });
  });

  describe('Behavior with MatchStrategy.StartWord', () => {
    const startWordStrategy = MatchStrategy.StartWord;

    it('should return filtered array with all matches', () => {
      expect(filterOptions('Bird', optionsArray, startWordStrategy)).toEqual([
        { label: 'Mountain Flower Bird', value: 'Mountain Flower Bird' },
        { label: 'Sun Bird', value: 'Sun Bird' },
        { label: 'Bird', value: 'Bird' },
      ]);
    });
  });

  describe('Behavior with MatchStrategy.StartString', () => {
    const startStringStrategy = MatchStrategy.StartString;

    it('should return filtered array with all matches', () => {
      expect(filterOptions('Sky', optionsArray, startStringStrategy)).toEqual([
        { label: 'Sky', value: 'Sky' },
      ]);
    });
  });
});
