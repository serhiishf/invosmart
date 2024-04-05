import { validateEmail } from './validationUtils';

describe('validateEmail', () => {
  it('should validate (returns true) simple correct email: simple@mail.com', () => {
    expect(validateEmail('simple@mail.com')).toBe(true);
  });

  it('should validate (returns true) email with "." symbol in local part: email.with.dot@mail.com', () => {
    expect(validateEmail('email.with.dot@mail.com')).toBe(true);
  });

  it('should validate (returns true) email with "+" symbol in local part: email+mod@gmail.ee', () => {
    expect(validateEmail('email+mod@gmail.com')).toBe(true);
  });

  it('should validate (returns true) email with "_" in local part: email_mod@msn.en', () => {
    expect(validateEmail('email_mod@msn.en')).toBe(true);
  });

  it('should validate (returns true) email with mixed special symbol in local part: ".","+","_": email+name_lastname.mod@aemail.ua', () => {
    expect(validateEmail('email+name_lastname.mod@aemail.ua')).toBe(true);
  });

  it('should validate (returns true) email with only numeric in local part: 12345@email.edu', () => {
    expect(validateEmail('12345@email.edu')).toBe(true);
  });

  it('should validate (returns true) email with "-" in domain part: example@some-domain.com', () => {
    expect(validateEmail('example@some-domain.com')).toBe(true);
  });

  it('should validate (returns true) email with long suffix domain part: exaple@somedomain.longtopdomain', () => {
    expect(validateEmail('exaple@somedomain.longtopdomain')).toBe(true);
  });

  it('should validate (returns true) email with subdomains in domain part: example@subdomain.domain.com', () => {
    expect(validateEmail('example@subdomain.domain.com')).toBe(true);
  });

  it('should validate (returns true) email with punycode equivalent of Unicode domain: hilekd@xn--sdl-nna.xn--o-eha', () => {
    expect(validateEmail('hilekd@xn--sdl-nna.xn--o-eha')).toBe(true);
  });

  it('should not validate (returns false) email with Unicode domain without punycode encoding: hilekd@õsdl.oü', () => {
    expect(validateEmail('hilekd@õsdl.oü')).toBe(false);
  });

  it('should not validate (returns false) email with two or more "@": email@with2@mail.com, emailwith2@mail.@com', () => {
    expect(validateEmail('email@with2@mail.com')).toBe(false);
    expect(validateEmail('emailwith2@mail.@com')).toBe(false);
  });

  it('should not validate (returns false) email without local part: @mail.com', () => {
    expect(validateEmail('@mail.com')).toBe(false);
  });

  it('should not validate (returns false) email without domain part: test@.com', () => {
    expect(validateEmail('test@.com')).toBe(false);
  });

  it('should not validate (returns false) email without domain suffix part: test@mail., test@mail', () => {
    expect(validateEmail('test@mail.')).toBe(false);
    expect(validateEmail('test@mail')).toBe(false);
  });

  it('should not validate (returns false) email with one letter domain suffix part: test@mail.c', () => {
    expect(validateEmail('test@mail.c')).toBe(false);
  });

  describe('Behavior with space " " in email', () => {
    test.each([
      ['wrong email@mail.com', false],
      ['email@wrong part.com', false],
      ['sample@gmail. ua', false],
      ['sample@gmail.c om', false],
      ['sample@gmail.com ', false],
      [' sample@gmail.com', false],
    ])('should not validate %s as an email, returns %s', (input, expected) => {
      expect(validateEmail(input)).toBe(expected);
    });
  });

  describe('Behavior with restricted symbols in domain part', () => {
    const resctrictedSymbolsInDomain = [
      '!',
      '@',
      '#',
      '$',
      '%',
      '^',
      '&',
      '*',
      '(',
      ')',
      ';',
      ':',
      ',',
      '?',
      '/',
      '\\',
      '=',
      '+',
      '<',
      '>',
    ];
    test.each(resctrictedSymbolsInDomain)(
      'example@domain%sd.com - should be not validate, returns false',
      (symbol) => {
        expect(validateEmail(`example@domain${symbol}d.com`)).toBe(false);
      }
    );
  });
});
