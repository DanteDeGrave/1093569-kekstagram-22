import {isEscEvent} from './util.js';

const mainTag = document.querySelector('main');

const showMessageUploadForm = (designation) => {
  const template = document.querySelector(`#${designation}`).content;
  const message = template.querySelector(`.${designation}`).cloneNode(true);
  message.style.zIndex = '100';
  mainTag.appendChild(message);
  const button = message.querySelector(`.${designation}__button`);
  const onDocumentKeydown = (evt) => {
    if (isEscEvent(evt) || evt.target.className === designation) {
      mainTag.removeChild(message);
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };
  const onButtonClick = () => {
    mainTag.removeChild(message);
    document.removeEventListener('keydown', onDocumentKeydown);
  };
  button.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showMessageErrorDownloadData = () => {
  const template = document.querySelector('#error').content;
  const message = template.querySelector('.error').cloneNode(true);
  message.style.zIndex = '100';
  mainTag.appendChild(message);
  const errorButton = message.querySelector('.error__button');
  const errorTitle = message.querySelector('.error__title');
  errorTitle.textContent = 'Нет связи с сервером!';
  errorButton.textContent = 'Попробуйте зайти позже';
  const onDocumentKeydown = (evt) => {
    if (isEscEvent(evt) || evt.target.className === 'error') {
      mainTag.removeChild(message);
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };
  const onErrorButtonClick = () => {
    mainTag.removeChild(message);
    document.removeEventListener('keydown', onDocumentKeydown);
  };
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export {showMessageUploadForm, showMessageErrorDownloadData};
