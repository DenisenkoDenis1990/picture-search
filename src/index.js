const axios = require('axios');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', OnSearch);

function OnSearch(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value;
  getImages(searchQuery);
}

async function getImages(query) {
  try {
    const params = {
      key: '29310891-e344a11b8695986423724ef53',
      q: query,
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };
    const response = await axios.get('https://pixabay.com/api/', { params });
    addGalleryMarkUp(response.data.hits);

    console.log(galleryMarkUp);
  } catch (error) {
    console.log(error);
  }
}

function addGalleryMarkUp(pictures) {
  let galleryMarkUp = pictures
    .map(picture => {
      return `<div class="photo-card">
  <a class="gallery-item" href ="${picture.largeImageURL}"><img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" width = 300px height = 300px/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${picture.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${picture.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${picture.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${picture.downloads}
    </p>
  </div>
</div>`;
    })
    .join('');

  refs.gallery.innerHTML = galleryMarkUp;
  let gallery = new SimpleLightbox('.gallery a');
}
