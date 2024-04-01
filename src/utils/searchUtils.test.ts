import { describe, it, expect } from 'vitest';
import { escapeForRegExp, findFirstMatchDepth } from './searchUtils';

describe('escapeForRegExp', () => {
  it('should escape special RegExp characters', () => {
    const specialChars = '.*+?^${}()|[]\\';
    const escapedChars = '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\';
    expect(escapeForRegExp(specialChars)).toEqual(escapedChars);
  });

  it('should return the same string if no special characters are present', () => {
    const normalString = 'Hello World';
    expect(escapeForRegExp(normalString)).toEqual(normalString);
  });

  it('should correctly escape a string with mixed special and normal characters', () => {
    const mixedString = 'Hello.*+?^${}()|[]\\World';
    const escapedMixedString = 'Hello\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\World';
    expect(escapeForRegExp(mixedString)).toEqual(escapedMixedString);
  });

  it('should handle empty strings correctly', () => {
    const emptyString = '';
    expect(escapeForRegExp(emptyString)).toEqual('');
  });

  it('should handle string start with space', () => {
    const stringStartEscape = ' String';
    expect(escapeForRegExp(stringStartEscape)).toEqual(' String');
  });

  it('should correctry escape string with mobile phone', () => {
    const telephoneNumberString = '+3726543210';
    expect(escapeForRegExp(telephoneNumberString)).toEqual('\\+3726543210');
  });

  it('should correctly escape string with email', () => {
    const emailString = 'test@email.com';
    expect(escapeForRegExp(emailString)).toEqual('test@email\\.com');
  });
});

/* describe('findFirstMatchDepth', () => {
  it()
}); */
