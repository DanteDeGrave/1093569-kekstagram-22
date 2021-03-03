import {isEscEvent} from './util.js';

const modalPhoto = document.querySelector('.big-picture');
const modalPhotoImg = modalPhoto.querySelector('.big-picture__img').querySelector('img');
const modalPhotoLikes = modalPhoto.querySelector('.likes-count');
const modalPhotoDescription = modalPhoto.querySelector('.social__caption');
const modalPhotoCommentsCount = modalPhoto.querySelector('.comments-count');
const modalPhotoCommentsList = modalPhoto.querySelector('.social__comments');
const modalButtonCancel = modalPhoto.querySelector('.big-picture__cancel');
const commentsLoaderButton =  modalPhoto.querySelector('.social__comments-loader');
const commentCount = modalPhoto.querySelector('.social__comment-count');
const COMMENTS_MIN_COUNT = 5;
let numberDisplayedComments = COMMENTS_MIN_COUNT;
let commentaries = [];

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
  document.querySelector('body').classList.remove('modal-open');
  modalButtonCancel.removeEventListener('click', closeModal);
  closeCommentariesButton();
  cleanCommentaries();
  commentsLoaderButton.removeEventListener('click', switchShowMoreButton);
  numberDisplayedComments = COMMENTS_MIN_COUNT;
}

const openModal = () => {
  modalPhoto.classList.remove('hidden');
  document.addEventListener('keydown',onPopUpEscKeydown);
  commentCount.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  modalButtonCancel.addEventListener('click', closeModal);
}

const switchShowMoreButton = () => {
  cleanCommentaries();
  numberDisplayedComments += 5;
  renderCommentaries();
  commentCount.innerHTML = `${modalPhotoCommentsList.children.length} из <span class="comments-count">${commentaries.length}</span> комментариев`;
}

const openCommentariesButton = () => {
  commentsLoaderButton.classList.remove('hidden');
  commentsLoaderButton.addEventListener('click', switchShowMoreButton);
}

const closeCommentariesButton = () => {
  commentsLoaderButton.classList.add('hidden');
}

const renderModalPicture = (object) => {
  openModal();
  modalPhotoImg.src = object.url;
  modalPhotoImg.alt = '';
  modalPhotoLikes.textContent = String(object.likes);
  modalPhotoDescription.textContent = object.description;
  modalPhotoCommentsList.innerHTML = '';
  commentaries = object.comments;
  if (commentaries.length > 0) {
    renderCommentaries();
  }
  if (commentaries.length > COMMENTS_MIN_COUNT) {
    openCommentariesButton();
    commentCount.classList.remove('hidden');
  }
  commentCount.innerHTML = `${modalPhotoCommentsList.children.length} из <span class="comments-count">${commentaries.length}</span> комментариев`;
}

const renderCommentaries = () => {
  commentaries.slice(0, numberDisplayedComments).forEach((element) => {
    const item = document.createElement('li');
    item.classList.add('social__comment');
    item.innerHTML = `<img class="social__picture" src="${element.avatar}" alt="${element.name}" width="35" height="35">
      <p class="social__text">${element.message}</p>`;
    modalPhotoCommentsList.appendChild(item);
    if (modalPhotoCommentsList.querySelectorAll('.social__comment').length === commentaries.length ) {
      closeCommentariesButton();
    }
  });
}

export {renderModalPicture};
