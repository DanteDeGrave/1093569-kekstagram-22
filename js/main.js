const getRandomIntNumber = function (min, max) {
  if (min < max) {
    //Код частично взят из источника: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.round(min);
    max = Math.round(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return alert('Минимальное значение должно быть меньше максимального');
}

const checkLengthString = function (string, maxLength) {
  return string.length <= maxLength;
}

getRandomIntNumber(10, 21); // Написал что бы линт не ругался на не используемую функцию
checkLengthString('Мама папа елка', 140); //True
checkLengthString('Мама папа елка', 10);// False
