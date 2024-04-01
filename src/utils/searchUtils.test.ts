import { describe, it, expect } from 'vitest';
import { MatchStrategy, escapeForRegExp, createSearchRegExp } from './searchUtils';

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
