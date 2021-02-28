import {renderPictures} from './gallery.js';
import {getRandomUniqNumber} from './util.js';


const RANDOM_FILTER_COUNT_PHOTO = 10;

const FILTERS = {
  'filter-default': (pictures)=>{
    renderPictures(pictures);
  },
  'filter-random': (pictures)=>{
    const pictureIndex = getRandomUniqNumber(0, pictures.length - 1);
    let randomPictures = []
    for (let i = 0; i < RANDOM_FILTER_COUNT_PHOTO; i++) {
      randomPictures.push(pictures[pictureIndex()]);
    }
    renderPictures(randomPictures);
  },
  'filter-discussed': (pictures)=>{
    const sortPictures = pictures.slice().sort((a, b) => b.comments.length - a.comments.length)
    renderPictures(sortPictures);
  },
};

export {FILTERS};
