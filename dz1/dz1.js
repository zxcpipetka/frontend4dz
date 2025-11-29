// Масив зображень (preview, original, description)
const galleryItems = [
  {
    preview: 'https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg',
    description: 'Tulips',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    description: 'Tree',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2014/09/21/12/28/milky-way-455819__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2014/09/21/12/28/milky-way-455819_1280.jpg',
    description: 'Milky Way',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/29/09/20/aurora-1867363__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/29/09/20/aurora-1867363_1280.jpg',
    description: 'Aurora',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/03/27/21/17/dog-1284305__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/03/27/21/17/dog-1284305_1280.jpg',
    description: 'Dog',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg',
    description: 'Avenue',
  },
];

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.js-lightbox-image'),
  closeBtn: document.querySelector('.js-close'),
  overlay: document.querySelector('.js-overlay'),
};

let currentIndex = -1;

function createGalleryItem({ preview, original, description }, index) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          data-index="${index}"
          alt="${description}"
        />
      </a>
    </li>`;
}

function renderGallery(items) {
  const markup = items.map((item, i) => createGalleryItem(item, i)).join('');
  refs.gallery.innerHTML = markup;
}

function openModal(index) {
  const item = galleryItems[index];
  if (!item) return;
  refs.lightbox.classList.add('is-open');
  refs.lightboxImage.src = item.original;
  refs.lightboxImage.alt = item.description;
  currentIndex = index;
  window.addEventListener('keydown', onKeyDown);
}

function closeModal() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
  currentIndex = -1;
  window.removeEventListener('keydown', onKeyDown);
}

function onGalleryClick(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== 'IMG') return;
  const index = Number(target.dataset.index);
  openModal(index);
}

function onCloseClick() {
  closeModal();
}

function onOverlayClick(event) {
  if (event.target === refs.overlay) {
    closeModal();
  }
}

function showImageByIndex(index) {
  if (index < 0 || index >= galleryItems.length) return;
  const item = galleryItems[index];
  refs.lightboxImage.src = item.original;
  refs.lightboxImage.alt = item.description;
  currentIndex = index;
}

function onKeyDown(event) {
  if (event.code === 'Escape') {
    closeModal();
    return;
  }
  if (event.code === 'ArrowRight') {
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    showImageByIndex(nextIndex);
  }
  if (event.code === 'ArrowLeft') {
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showImageByIndex(prevIndex);
  }
}

// Ініціалізація
renderGallery(galleryItems);
refs.gallery.addEventListener('click', onGalleryClick);
refs.closeBtn.addEventListener('click', onCloseClick);
refs.overlay.addEventListener('click', onOverlayClick);
