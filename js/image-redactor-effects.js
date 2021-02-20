
const imageUploadForm = document.querySelector('.img-upload__form');
const sliderArea = imageUploadForm.querySelector('.img-upload__effect-level');
const effectList = imageUploadForm.querySelector('.effects__list');
const effectLevel = imageUploadForm.querySelector('.effect-level__value');
const uploadPreviewPhoto = imageUploadForm.querySelector('.img-upload__preview');
let filter = '';
let unit = '';

/* global noUiSlider:readonly */

const slider = imageUploadForm.querySelector('.effect-level__slider');

const getSliderOn = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  slider.noUiSlider.on('update', (values, handle) => {
    effectLevel.value = values[handle];
    uploadPreviewPhoto.style.filter = `${filter}(${effectLevel.value}${unit})`;
  });
}

const getSliderOff = () => slider.noUiSlider.destroy();

const getEffect = (evt)=> {
  if (evt.target.id === 'effect-none') {
    sliderArea.classList.add('hidden');
  } else {
    sliderArea.classList.remove('hidden');
  }

  uploadPreviewPhoto.className = 'img-upload__preview';

  switch (evt.target.id) {

    case 'effect-none':
      uploadPreviewPhoto.style.filter = '';
      break;

    case 'effect-chrome':
      uploadPreviewPhoto.classList.add('effects__preview--chrome');
      filter = 'grayscale';
      unit = '';
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;

    case 'effect-sepia':
      uploadPreviewPhoto.classList.add('effects__preview--sepia');
      filter = 'sepia';
      unit = '';
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;

    case 'effect-marvin':
      uploadPreviewPhoto.classList.add('effects__preview--marvin');
      filter = 'invert';
      unit = '%';
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;

    case 'effect-phobos':
      uploadPreviewPhoto.classList.add('effects__preview--phobos');
      filter = 'blur';
      unit = 'px';
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;

    case 'effect-heat':
      uploadPreviewPhoto.classList.add('effects__preview--heat');
      filter = 'brightness';
      unit = '';
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
  }
}

effectList.addEventListener('change', getEffect);

export {getSliderOn, getSliderOff};
