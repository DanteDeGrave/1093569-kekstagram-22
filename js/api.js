import {renderPictures} from './gallery.js';
import {messageUploadForm, messageErrorDownloadData} from './form-modal.js';

const serverUrlDownloadData = 'https://22.javascript.pages.academy/kekstagram/data';
const serverUrlUploadData = 'https://22.javascript.pages.academy/kekstagram';

fetch(serverUrlDownloadData)
  .then((response) => response.json())
  .then((objects)=>renderPictures(objects))
  .catch(()=>messageErrorDownloadData());

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
