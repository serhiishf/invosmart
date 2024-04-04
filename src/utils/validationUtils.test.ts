import { validateEmail } from './validationUtils';

describe('validateEmail', () => {
  it('should validate simple correct email', () => {
    expect(validateEmail('correctTest@mail.com')).toBe(true);
  });

  it('should validate email with "." symbol in local part', () => {
    expect(validateEmail('email.with.dot@mail.com')).toBe(true);
  });

  it('should validate email with "+" symbol in local part', () => {
    expect(validateEmail('email+modificator@gmail.com')).toBe(true);
  });

  it('should validate email with "_" in local part', () => {
    expect(validateEmail('email_modificator@msn.en')).toBe(true);
  });

  it('should validate email with mixed special symbol in local part: ".","+","_"', () => {
    expect(validateEmail('email+name_lastname.modificator@testemail.net')).toBe(true);
  });

  it('should not validate email with two or more "@"', () => {
    expect(validateEmail('email@with2@mail.com')).toBe(false);
    expect(validateEmail('emailwith2@mail.@com')).toBe(false);
  });

  it('should not validate email without local part - "@mail.com"', () => {
    expect(validateEmail('@mail.com')).toBe(false);
  });

  it('should not validate email without domain part - "test@.com"', () => {
    expect(validateEmail('test@.com')).toBe(false);
  });

  it('should not validate email without domain suffix part - "test@mail." || "test@mail"', () => {
    expect(validateEmail('test@mail.')).toBe(false);
    expect(validateEmail('test@mail')).toBe(false);
  });

  it('should not validate email with one letter domain suffix part - "test@mail.c"', () => {
    expect(validateEmail('test@mail.c')).toBe(false);
  });

  it('should not validate email with domain part ending to "-" - "test@email-.com"', () => {
    expect(validateEmail('test@email-.com')).toBe(false);
  });

  it('should validate email with "-" in domain part', () => {
    expect(validateEmail('someemail@domain-separated.com')).toBe(true);
  });
});
