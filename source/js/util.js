const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const validateStringLength = (string, maxLength) => {
  return string.length > maxLength;
};

const getRandomIntNumber = (min, max) => {
  if (min <= max) {
    min = Math.round(min);
    max = Math.round(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return alert('Минимальное значение должно быть меньше или рано максимальному');
};

const getRandomUniqNumber = (min, max) => {
  const ids = [];

  return () => {
    let currentValue = getRandomIntNumber(min, max);
    if (ids.length >= (max - min + 1)) {
      throw new Error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
    }
    while (ids.includes(currentValue)) {
      currentValue = getRandomIntNumber(min, max);
    }
    ids.push(currentValue);
    return currentValue;
  }
};

export {isEscEvent, validateStringLength, getRandomUniqNumber};
