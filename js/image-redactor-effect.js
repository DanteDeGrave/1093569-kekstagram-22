
const imageUploadForm = document.querySelector('.img-upload__form');
const sliderArea = imageUploadForm.querySelector('.img-upload__effect-level');
const effectList = imageUploadForm.querySelector('.effects__list');
const effectLevel = imageUploadForm.querySelector('.effect-level__value');
const uploadPreviewPhoto = imageUploadForm.querySelector('.img-upload__preview');
let filter = '';
let unit = '';
const filterEffects = {
  original: {
    name: 'effect-none',
    filter: '',
  },
  chrome: {
    name:'effect-chrome',
    className:'effects__preview--chrome',
    filter: 'grayscale',
    unit:'',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  sepia: {
    name:'effect-sepia',
    className:'effects__preview--sepia',
    filter: 'sepia',
    unit:'',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  marvin: {
    name:'effect-marvin',
    className:'effects__preview--marvin',
    filter: 'invert',
    unit:'%',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
  },
  phobos: {
    name:'effect-phobos',
    className:'effects__preview--phobos',
    filter: 'blur',
    unit:'px',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
  },
  heat: {
    name:'effect-heat',
    className:'effects__preview--heat',
    filter: 'brightness',
    unit:'',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
  },
};

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
  effectList.addEventListener('change', getEffect);
}

const getSliderOff = () => {
  slider.noUiSlider.destroy();
  effectList.removeEventListener('change', getEffect);
}

const getEffect = (evt)=> {
  if (evt.target.id === filterEffects.original.name) {
    sliderArea.classList.add('hidden');
  } else {
    sliderArea.classList.remove('hidden');
  }

  uploadPreviewPhoto.className = 'img-upload__preview';

  switch (evt.target.id) {

    case filterEffects.original.name:
      uploadPreviewPhoto.style.filter = filterEffects.original.filter;
      break;

    case filterEffects.chrome.name:
      uploadPreviewPhoto.classList.add(filterEffects.chrome.className);
      filter = filterEffects.chrome.filter;
      unit = filterEffects.chrome.unit;
      slider.noUiSlider.updateOptions({
        range: {
          min: filterEffects.chrome.min,
          max: filterEffects.chrome.max,
        },
        start: filterEffects.chrome.start,
        step: filterEffects.chrome.step,
      });
      break;

    case filterEffects.sepia.name:
      uploadPreviewPhoto.classList.add(filterEffects.sepia.className);
      filter = filterEffects.sepia.filter;
      unit = filterEffects.sepia.unit;
      slider.noUiSlider.updateOptions({
        range: {
          min: filterEffects.sepia.min,
          max: filterEffects.sepia.max,
        },
        start: filterEffects.sepia.start,
        step: filterEffects.sepia.step,
      });
      break;

    case filterEffects.marvin.name:
      uploadPreviewPhoto.classList.add(filterEffects.marvin.className);
      filter = filterEffects.marvin.filter;
      unit = filterEffects.marvin.unit;
      slider.noUiSlider.updateOptions({
        range: {
          min: filterEffects.marvin.min,
          max: filterEffects.marvin.max,
        },
        start: filterEffects.marvin.start,
        step: filterEffects.marvin.step,
      });
      break;

    case filterEffects.phobos.name:
      uploadPreviewPhoto.classList.add(filterEffects.phobos.className);
      filter = filterEffects.phobos.filter;
      unit = filterEffects.phobos.unit;
      slider.noUiSlider.updateOptions({
        range: {
          min: filterEffects.phobos.min,
          max: filterEffects.phobos.max,
        },
        start: filterEffects.phobos.start,
        step: filterEffects.phobos.step,
      });
      break;

    case filterEffects.heat.name:
      uploadPreviewPhoto.classList.add(filterEffects.heat.className);
      filter = filterEffects.heat.filter;
      unit = filterEffects.heat.unit;
      slider.noUiSlider.updateOptions({
        range: {
          min: filterEffects.heat.min,
          max: filterEffects.heat.max,
        },
        start: filterEffects.heat.start,
        step: filterEffects.heat.step,
      });
      break;
  }
}

export {getSliderOn, getSliderOff};
