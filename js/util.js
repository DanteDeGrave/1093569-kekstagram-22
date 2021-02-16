
const getRandomIntNumber = (min, max) => {
  if (min <= max) {
    //Код частично взят из источника: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.round(min);
    max = Math.round(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return alert('Минимальное значение должно быть меньше или рано максимальному');
}

const getIdNumber = (max) => {
  const ids = [];

  return () => {
    let currentValue = getRandomIntNumber(1, max);
    if (ids.length >= (max - 1 + 1)) {
      throw new Error('Перебраны все числа из диапазона от ' + 1 + ' до ' + max);
    }
    while (ids.includes(currentValue)) {
      currentValue = getRandomIntNumber(1, max);
    }
    ids.push(currentValue);
    return currentValue;
  }
}

const getArrayElements = (array) => {
  return array[getRandomIntNumber(0, array.length - 1)];
}

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
}

export {getIdNumber, getArrayElements, getRandomIntNumber, isEscEvent};
