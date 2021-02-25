import {isEscEvent} from './util.js';

const mainTag = document.querySelector('main');

const messageUploadForm = (designation)=> {
  const template = document.querySelector(`#${designation}`).content;
  const message = template.querySelector(`.${designation}`).cloneNode(true);
  message.style.zIndex = '100';
  mainTag.appendChild(message);
  const button = message.querySelector(`.${designation}__button`);

  const isEscOnMessage = (evt) =>{
    if (isEscEvent(evt) || evt.target.className === designation) {
      mainTag.removeChild(message);
      document.removeEventListener('keydown', isEscOnMessage);
    }
  }

  button.addEventListener('click', ()=>{
    mainTag.removeChild(message);
    document.removeEventListener('keydown', isEscOnMessage);
  });

  message.addEventListener('click',isEscOnMessage);
  document.addEventListener('keydown', isEscOnMessage);
}

const messageErrorDownloadData = ()=> {
  const template = document.querySelector('#error').content;
  const message = template.querySelector('.error').cloneNode(true);
  message.style.zIndex = '100';
  mainTag.appendChild(message);
  const errorButton = message.querySelector('.error__button');
  const errorTitle = message.querySelector('.error__title');
  errorTitle.textContent = 'Нет связи с сервером!';
  errorButton.textContent = 'Попробуйте зайти позже';
  const isEscOnMessage = (evt) =>{
    if (isEscEvent(evt) || evt.target.className === 'error') {
      mainTag.removeChild(message);
      document.removeEventListener('keydown', isEscOnMessage);
    }
  }
  errorButton.addEventListener('click', ()=>{
    mainTag.removeChild(message);
    document.removeEventListener('keydown', isEscOnMessage);
  });

  message.addEventListener('click',isEscOnMessage);
  document.addEventListener('keydown', isEscOnMessage);
}

export {messageUploadForm, messageErrorDownloadData};
