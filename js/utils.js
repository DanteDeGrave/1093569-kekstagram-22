
const getRandomIntNumber = function (min, max) {
  if (min <= max) {
    //Код частично взят из источника: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.round(min);
    max = Math.round(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return alert('Минимальное значение должно быть меньше или рано максимальному');
}

let lastId = 0;

const getIdNumber = () => {
  lastId += 1;
  return lastId;
}

const getArrayElements = function (array) {
  return array[getRandomIntNumber(0, array.length - 1)];
}

export {getIdNumber};
export {getArrayElements};
export {getRandomIntNumber};
