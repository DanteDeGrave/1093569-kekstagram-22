import {isEscEvent} from './util.js';

const mainTag = document.querySelector('main');

const showMessageUploadForm = (designation) => {
  const template = document.querySelector(`#${designation}`).content;
  const message = template.querySelector(`.${designation}`).cloneNode(true);
  message.style.zIndex = '100';
  mainTag.appendChild(message);
  const button = message.querySelector(`.${designation}__button`);
  const onMessageUploadEscKeydown = (evt) => {
    if (isEscEvent(evt) || evt.target.className === designation) {
      mainTag.removeChild(message);
      document.removeEventListener('keydown', onMessageUploadEscKeydown);
    }
  };
  const onMessageUploadClick = () => {
    mainTag.removeChild(message);
    document.removeEventListener('keydown', onMessageUploadEscKeydown);
  };
  button.addEventListener('click', () => {
    mainTag.removeChild(message);
    document.removeEventListener('keydown', onMessageUploadEscKeydown);
  });
  message.addEventListener('click', onMessageUploadClick);
  document.addEventListener('keydown', onMessageUploadEscKeydown);
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
  const onMessageErrorEscKeydown = (evt) => {
    if (isEscEvent(evt) || evt.target.className === 'error') {
      mainTag.removeChild(message);
      document.removeEventListener('keydown', onMessageErrorEscKeydown);
    }
  };
  const onMessageErrorClick = () => {
    mainTag.removeChild(message);
    document.removeEventListener('keydown', onMessageErrorEscKeydown);
  };
  errorButton.addEventListener('click', onMessageErrorClick);
  message.addEventListener('click', onMessageErrorClick);
  document.addEventListener('keydown', onMessageErrorEscKeydown);
};

export {showMessageUploadForm, showMessageErrorDownloadData};
