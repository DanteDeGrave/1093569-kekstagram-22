/* global _:readonly */
import {renderPictures} from './gallery.js';
import {getRandomUniqNumber} from './util.js';

const RANDOM_FILTER_COUNT_PHOTO = 10;
const RENDER_DELAY = 500;

const FILTERS = {
  'filter-default': (pictures) => {
    _.debounce(() => renderPictures(pictures), RENDER_DELAY)();
  },
  'filter-random': (pictures) => {
    const pictureIndex = getRandomUniqNumber(0, pictures.length - 1);
    let randomPictures = []
    for (let i = 0; i < RANDOM_FILTER_COUNT_PHOTO; i++) {
      randomPictures.push(pictures[pictureIndex()]);
    }
    _.debounce(() => renderPictures(randomPictures), RENDER_DELAY)();
  },
  'filter-discussed': (pictures) => {
    const sortPictures = pictures.slice().sort((a, b) => b.comments.length - a.comments.length)
    _.debounce(() => renderPictures(sortPictures), RENDER_DELAY)();
  },
};
export {FILTERS};
