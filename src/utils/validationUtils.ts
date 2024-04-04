export const validateEmail = (email: string) => {
  const emailRegex = /^(?!\.)(?!\s)(?:(?:"[^"]*")|[^@\s])+@[^@\s]+\.[^@\s.]+(?<!\.)(?<!\s)$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length > 7;
};

export const validateField = (type: string, value: string) => {
  switch (type) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    default:
      return true;
  }
};
