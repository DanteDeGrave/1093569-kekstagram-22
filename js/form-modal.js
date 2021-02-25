import {isEscEvent} from './util.js';

const mainTag = document.querySelector('main');

const messageUploadForm = (designation)=> {
  const template = document.querySelector(`#${designation}`).content;
  const message = template.querySelector(`.${designation}`).cloneNode(true);
  message.style.zIndex = '100';
  mainTag.appendChild(message);
  const errorButton = message.querySelector(`.${designation}__button`);

  const isEscOnMessage = (evt) =>{
    if (isEscEvent(evt) || evt.target.className === designation) {
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

export {messageUploadForm};
