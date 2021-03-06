import fetchFunc from './tools/apiService';
import card from './tools/imageCard.hbs';
import './styles.css';

let page = 1;
let query;

const key = '17184359-ed805c17d636e4958a66ce3d0';

const root = document.querySelector('.root');
const input = document.querySelector('input');
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

function moreBtnCreate() {
  if (!document.querySelector('.more')) {
    const moreBtn = document.createElement('button');
    moreBtn.classList.add('more');
    root.append(moreBtn);
    moreBtn.textContent = 'Load more images';
  }
}

function renderImages(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  query = input.value;
  fetchFunc(query, page, key).then(hits => {
    const markup = card(hits);
    gallery.innerHTML = markup;
    moreBtnCreate();
    document.querySelector('.more').addEventListener('click', renderMoreImages);
    form.reset();
  });
}

function renderMoreImages() {
  page += 1;
  fetchFunc(query, page, key).then(hits => {
    const markup = card(hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 100,
        behavior: 'smooth',
      });
    }, 1000);
  });
}

form.addEventListener('submit', renderImages);
