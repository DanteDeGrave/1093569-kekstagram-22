
import {getRandomUniqNumber} from './util.js';

const RANDOM_FILTER_COUNT_PHOTO = 10;

const FILTERS = {
  'filter-default': (pictures) => {
    return pictures
  },
  'filter-random': (pictures) => {
    const pictureIndex = getRandomUniqNumber(0, pictures.length - 1);
    let randomPictures = []
    for (let i = 0; i < RANDOM_FILTER_COUNT_PHOTO; i++) {
      randomPictures.push(pictures[pictureIndex()]);
    }
    return randomPictures
  },
  'filter-discussed': (pictures) => {
    return pictures.slice().sort((a, b) => b.comments.length - a.comments.length)
  },
};
export {FILTERS};
