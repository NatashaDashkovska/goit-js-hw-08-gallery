const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImageRef = document.querySelector('.lightbox__image');
const btnCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const overlayRef = document.querySelector('.lightbox__overlay');
const bodyRef = document.querySelector('body');

galleryRef.addEventListener('click', openModal);
btnCloseRef.addEventListener('click', closeModal);
overlayRef.addEventListener('click', closeModal);
let newIdx = 0;

const createItem = galleryItems.map((elem, idx) => {
  const listItem = document.createElement('li');
  const linkItem = document.createElement('a');
  const image = document.createElement('img');

  listItem.classList.add('gallery__item');
  linkItem.classList.add('gallery__link');
  image.classList.add('gallery__image');
  image.setAttribute('data-source', elem.original);
  image.setAttribute('data-index', [idx]);

  image.src = elem.preview;
  image.alt = elem.description;
  linkItem.href = elem.original;

  linkItem.appendChild(image);
  listItem.appendChild(linkItem);
  return listItem;
});

galleryRef.append(...createItem);

function closeModal() {
  modalRef.classList.remove('is-open');
  modalImageRef.src = '';
  bodyRef.removeEventListener('keydown', closeModalWithEsc);
  bodyRef.removeEventListener('keydown', nextImage);
}

function openModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  modalRef.classList.add('is-open');
  modalImageRef.src = event.target.dataset.source;
  modalImageRef.alt = event.target.alt;
  newIdx = event.target.dataset.index;
  newIdx = Number(newIdx);
  bodyRef.addEventListener('keydown', closeModalWithEsc);
  bodyRef.addEventListener('keydown', nextImage);
}

function closeModalWithEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function nextImage(event) {
  if (event.code === 'ArrowRight' && newIdx < galleryItems.length - 1) {
    const nextIdx = (newIdx += 1);

    modalImageRef.src = galleryItems[nextIdx].original;
  }
  if (event.code === 'ArrowLeft' && newIdx > 0) {
    const prevIdx = (newIdx -= 1);

    modalImageRef.src = galleryItems[prevIdx].original;
  }
}
