function firstMatchFinder(
  phrase: string,
  searchArray: string[],
  matchType: 'startString' | 'startWord' | 'anyMatch'
) {
  const NOT_FOUND = -1;
  const escapePhrase = escapeRegExp(phrase);
  let pattern = escapePhrase; // Значення за замовчуванням для anyMatch
  if (matchType === 'startString') {
    pattern = `^${escapePhrase}`;
  } else if (matchType === 'startWord') {
    pattern = `\\b${escapePhrase}`;
  }
  // Створення одного регулярного виразу з врахуванням ігнорування регістру
  const regExp = new RegExp(pattern, 'i');

  // Перебираємо searchArray, шукаємо перше співпадіння
  for (let i = 0; i < searchArray.length; i++) {
    if (regExp.test(searchArray[i])) {
      return i; // Повертаємо індекс першого співпадіння
    }
  }

  return NOT_FOUND; // Якщо співпадіння не знайдено
}

export default firstMatchFinder;

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
