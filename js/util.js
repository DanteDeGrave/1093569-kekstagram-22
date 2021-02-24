
const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
}

const validationStringLength = (string, maxLength) => {
  return string.length > maxLength;
}

export {isEscEvent, validationStringLength};
