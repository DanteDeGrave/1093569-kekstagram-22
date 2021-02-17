const imageUploadForm = document.querySelector('.img-upload__form');
const uploadImage = imageUploadForm.querySelector('.img-upload__input');
const modalRedactorImage = imageUploadForm.querySelector('.img-upload__overlay');

uploadImage.addEventListener('change', () => {
  modalRedactorImage.classList.remove('hidden');
  uploadImage.value = '';
})
