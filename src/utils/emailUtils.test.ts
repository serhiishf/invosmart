import { normalizeEmail } from './emailUtils';

describe('normalizeEmail', () => {
  it('should return the original email when already normalized', () => {
    expect(normalizeEmail('some@gmail.com')).toBe('some@gmail.com');
  });

  it('should convert email to lowercase', () => {
    expect(normalizeEmail('Some@EMAIL.cOM')).toBe('some@email.com');
  });

  it('should return empty string when passed an empty string', () => {
    expect(normalizeEmail('')).toBe('');
  });
});
