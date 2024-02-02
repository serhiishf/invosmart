function validateEmail(email: string) {
  const emailRegex = /^(?!\.)(?!\s)(?:(?:"[^"]*")|[^@\s])+@[^@\s]+\.[^@\s.]+(?<!\.)(?<!\s)$/;
  return emailRegex.test(email);
}

function validatePassword(password: string) {
  return password.length > 7;
}

export function validateField(type: string, value: string) {
  switch (type) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    default:
      return true;
  }
}
