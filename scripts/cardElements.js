// Cards massive
const initialCards = [
    {
      name: 'Дагестан',
      link: 'https://images.unsplash.com/photo-1626517545905-dd9a490e013b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Джылгы-Су',
      link: 'https://images.unsplash.com/photo-1628932365814-8c66a154f468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
    },
    {
      name: 'Байкал',
      link: 'https://images.unsplash.com/photo-1551845041-63e8e76836ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80'
    },
    {
      name: 'Санкт-Петербург',
      link: 'https://images.unsplash.com/photo-1640358251835-b185f9822d56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
      name: 'Коноха',
      link: 'https://c4.wallpaperflare.com/wallpaper/792/592/850/akatsuki-konoha-naruto-pein-wallpaper-preview.jpg'
    }
];


const listElement = document.querySelector('.elements');
const formElementAdd = document.querySelector('#formAdded');
const placeInput = formElementAdd.querySelector('#placeInput');
const linkInput = formElementAdd.querySelector('#linkInput');
const templateElement = document.querySelector('.template');
const popupConteinerPhoto = document.querySelector('.popup-photo');
const popupPhoto = popupConteinerPhoto.querySelector('.popup__image');
const popupCaption = popupConteinerPhoto.querySelector('.popup__caption');
const btnClosePhoto = popupConteinerPhoto.querySelector('.popup__close-button');


function createCardHadler(e) {
  e.preventDefault();

  const place = placeInput.value;
  placeInput.value = '';

  const link = linkInput.value;
  linkInput.value = '';

  const objectElement = {
    name: place,
    link: link
  }
  
  listElement.prepend(createCard(objectElement));
  togglePopup(popupAdded)
}

function handleDelete(e) {
  const deleteElement = e.target.closest('.element');
  deleteElement.remove()
}

function handleLike(e) {
  const likeBtn = e.target.closest('.element');
    e.target.classList.toggle('element__button-like_active');
}

function popupPhotoHandle(e, link, name) {
  togglePopup(popupConteinerPhoto);
  popupPhoto.src = link;
  popupCaption.textContent = name;
}
btnClosePhoto.addEventListener('click', function () {
  togglePopup(popupConteinerPhoto);
})

function createCard(object) {
  const newCardElement = templateElement.content.firstElementChild.cloneNode(true);
  const cardPhoto = newCardElement.querySelector('card__image');
  newCardElement.querySelector('.element__title').textContent = object.name;
  newCardElement.querySelector('.element__image').src = object.link;
  newCardElement.querySelector('.element__image').alt = object.name;

  newCardElement.querySelector('.element__btn-delete').addEventListener('click', handleDelete);

  newCardElement.querySelector('.element__button-like').addEventListener('click', handleLike);

  newCardElement.querySelector('.element__image').addEventListener('click', e => popupPhotoHandle(e, object.link, object.name));

  return newCardElement;
}

function addCards() {
  initialCards.forEach(element => {
    listElement.prepend(createCard(element));
  });
}

formElementAdd.addEventListener('submit', createCardHadler);

addCards()
