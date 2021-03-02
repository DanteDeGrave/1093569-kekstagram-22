import {isEscEvent} from './util.js';

const modalPhoto = document.querySelector('.big-picture');
const modalPhotoImg = modalPhoto.querySelector('.big-picture__img').querySelector('img');
const modalPhotoLikes = modalPhoto.querySelector('.likes-count');
const modalPhotoDescription = modalPhoto.querySelector('.social__caption');
const modalPhotoCommentsCount = modalPhoto.querySelector('.comments-count');
const modalPhotoCommentsList = modalPhoto.querySelector('.social__comments');
const modalButtonCancel = modalPhoto.querySelector('.big-picture__cancel');
const commentsLoaderButton =  modalPhoto.querySelector('.social__comments-loader');
const COMMENTS_MIN_COUNT = 5;
let numberDisplayedComments = COMMENTS_MIN_COUNT;

const onPopUpEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closeModal();
  }
}

const cleanCommentaries = () => {
  const comment = modalPhotoCommentsList.querySelectorAll('.social__comment');
  comment.forEach((element) => {
    element.remove();
  });
}

const closeModal = () => {
  modalPhoto.classList.add('hidden');
  document.removeEventListener('keydown',onPopUpEscKeydown);
  modalPhoto.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
  modalButtonCancel.removeEventListener('click', closeModal);
  closeCommentariesButton();
  cleanCommentaries();
}

const openModal = () => {
  modalPhoto.classList.remove('hidden');
  document.addEventListener('keydown',onPopUpEscKeydown);
  modalPhoto.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  modalButtonCancel.addEventListener('click', closeModal);
}

const openCommentariesButton = (arrayComments) => {
  commentsLoaderButton.classList.remove('hidden');

  commentsLoaderButton.addEventListener('click', () => {
    cleanCommentaries();
    numberDisplayedComments += 5;
    renderCommentaries(arrayComments);
  });
}

const closeCommentariesButton = () => {
  commentsLoaderButton.classList.add('hidden');
  numberDisplayedComments = COMMENTS_MIN_COUNT;
  commentsLoaderButton.removeEventListener('click', () => {}); // Заготовка
}

const renderModalPicture = (object) => {
  openModal();
  modalPhotoImg.src = object.url;
  modalPhotoImg.alt = '';
  modalPhotoLikes.textContent = String(object.likes);
  modalPhotoCommentsCount.textContent = String(object.comments.length);
  modalPhotoDescription.textContent = object.description;
  modalPhotoCommentsList.innerHTML = '';

  if (object.comments.length > 0) {
    renderCommentaries(object.comments);
  }
  if (object.comments.length > COMMENTS_MIN_COUNT) {
    openCommentariesButton(object.comments);
  }
}

const renderCommentaries = (arrayComments) => {
  arrayComments.slice(0, numberDisplayedComments).forEach((element) => {
    const item = document.createElement('li');
    item.classList.add('social__comment');
    item.innerHTML = `<img class="social__picture" src="${element.avatar}" alt="${element.name}" width="35" height="35">
      <p class="social__text">${element.message}</p>`;
    modalPhotoCommentsList.appendChild(item);

    if (modalPhotoCommentsList.querySelectorAll('.social__comment').length === arrayComments.length ) {
      closeCommentariesButton();
    }
  });
}

export {renderModalPicture};
