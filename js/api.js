import {renderPictures} from './gallery.js'
const serverUrl = 'https://22.javascript.pages.academy/kekstagram/data';

fetch(serverUrl)
  .then((response) => response.json())
  .then((objects)=>{renderPictures(objects)});
