import { validateEmail } from './validationUtils';

describe('validateEmail', () => {
  it('should validate simple correct email: simple@mail.com', () => {
    expect(validateEmail('simple@mail.com')).toBe(true);
  });

  it('should validate email with "." symbol in local part: email.with.dot@mail.com', () => {
    expect(validateEmail('email.with.dot@mail.com')).toBe(true);
  });

  it('should validate email with "+" symbol in local part: email+mod@gmail.ee', () => {
    expect(validateEmail('email+mod@gmail.com')).toBe(true);
  });

  it('should validate email with "_" in local part: email_mod@msn.en', () => {
    expect(validateEmail('email_mod@msn.en')).toBe(true);
  });

  it('should validate email with mixed special symbol in local part: ".","+","_": email+name_lastname.mod@aemail.ua', () => {
    expect(validateEmail('email+name_lastname.mod@aemail.ua')).toBe(true);
  });

  it('should validate email with "-" in domain part: example@some-domain.com', () => {
    expect(validateEmail('someemail@domain-separated.com')).toBe(true);
    expect(validateEmail('example@some-domain.comasd')).toBe(true);
  });

  it('should validate email with long suffix domain part: exaple@somedomain.longtopdomain', () => {
    expect(validateEmail('exaple@somedomain.longtopdomain')).toBe(true);
  });

  it('should validate email with subdomains in domain part: example@subdomain.domain.com', () => {
    expect(validateEmail('example@subdomain.domain.com')).toBe(true);
  });

  it('should not validate email with two or more "@": email@with2@mail.com, emailwith2@mail.@com', () => {
    expect(validateEmail('email@with2@mail.com')).toBe(false);
    expect(validateEmail('emailwith2@mail.@com')).toBe(false);
  });

  it('should not validate email without local part: @mail.com', () => {
    expect(validateEmail('@mail.com')).toBe(false);
  });

  it('should not validate email without domain part: test@.com', () => {
    expect(validateEmail('test@.com')).toBe(false);
  });

  it('should not validate email without domain suffix part: test@mail., test@mail', () => {
    expect(validateEmail('test@mail.')).toBe(false);
    expect(validateEmail('test@mail')).toBe(false);
  });

  it('should not validate email with one letter domain suffix part: test@mail.c', () => {
    expect(validateEmail('test@mail.c')).toBe(false);
  });

  it('should not validate email with domain part ending to "-": test@email-.com', () => {
    expect(validateEmail('test@email-.com')).toBe(false);
  });

  describe('Behavior with space " " in email', () => {
    it('TODO this test', () => {
      expect(true).toBe(false);
    });
    /* it('should not validate email with spaces in any part " ": "wrong email@mail.com", "email@wrong part.com"', () => {
      expect(validateEmail('wrong email@mail.com')).toBe(false);
      expect(validateEmail('email@wrong part.com')).toBe(false);
    }); */
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
      'example@domain%sd.com - should be not validate',
      (symbol) => {
        expect(validateEmail(`example@domain${symbol}d.com`)).toBe(false);
      }
    );
  });
});
