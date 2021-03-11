const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadImage = document.querySelector('.img-upload__input');
const imgPreviewPhoto = document.querySelector('img');

const selectFile = () => {
  const file = uploadImage.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      imgPreviewPhoto.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

export {selectFile};
