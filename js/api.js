import {messageUploadForm, messageErrorDownloadData} from './form-modal.js';
import {renderPicturesContent} from './gallery.js';

const serverUrlDownloadData = 'https://22.javascript.pages.academy/kekstagram/data';
const serverUrlUploadData = 'https://22.javascript.pages.academy/kekstagram';

fetch(serverUrlDownloadData)
  .then((response) => response.json())
  .then(renderPicturesContent)
  .catch(messageErrorDownloadData);

const setImageRedactorFormSubmit = (onSuccess) => {
  const imageUploadForm = document.querySelector('.img-upload__form');
  imageUploadForm.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch(serverUrlUploadData, {
      method: 'POST',
      body: formData,
    }).then((response)=> {
      if (response.ok) {
        onSuccess();
        messageUploadForm('success');
      } else {
        messageUploadForm('error');
      }
    }).catch(()=>messageUploadForm('error'));
  });
}

export {setImageRedactorFormSubmit};
