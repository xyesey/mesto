import { Card } from './card.js';
import { FormValidate } from './formValidator.js';

const initialCards = [
    {
      name: '2004',
      image: 'https://hiphop4real.com/wp-content/uploads/2019/12/0rk8r5vth8u.jpg'
    },
    {
      name: 'STAY UGLY',
      image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/01eebf94798727.5e98d49aa164d.jpg'
    },
    {
      name: 'Кривой Эфир',
      image: 'https://avatars.yandex.net/get-music-content/99892/c3f59bcb.a.9378276-1/m1000x1000?webp=false'
    },
    {
      name: 'NO BANG! HOLD ON!',
      image: 'https://avatars.yandex.net/get-music-content/6447985/e607cdd9.a.22059674-1/m1000x1000?webp=false'
    },
    {
      name: 'ОПГ Сити',
      image: 'https://lastfm.freetls.fastly.net/i/u/ar0/7e5ef83884af67ff43123822c132866b.jpg'
    },
    {
      name: 'First Day Out',
      image: 'https://i.ytimg.com/vi/M1IsBbw0_mU/maxresdefault.jpg?7857057827'
    }
];

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorSelector: 'popup__error'
};

// Popups
const popupList = document.querySelectorAll('popup');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-added');
// Buttons
const btnCloseAdd = popupAdd.querySelector('.popup__close-button');
const btnCloseEdit = popupEdit.querySelector('.popup__close-button');
const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button');
const btnCreate = document.querySelector('.createBtn');
// Popup save value form
const formElementEdit = document.querySelector('#formEdit');
const nameInput = formElementEdit.querySelector('#nameInput');
const jobInput = formElementEdit.querySelector('#jobInput');
const name = document.querySelector('.profile__info-title');
const jobProfile = document.querySelector('.profile__info-subtitle');
//Cards
const cardElements = document.querySelector('.elements')
const popupConteinerPhoto = document.querySelector('.popup-photo')
const popupImage = document.querySelector('.popup__image');
const btnCloseImage = document.querySelector('.popup__close-button');
const popupCaption = document.querySelector('.popup__caption');
const formElementAdd = document.querySelector('#formAdded')
const placeInput = document.querySelector('#placeInput');
const linkInput = document.querySelector('#linkInput');
const templateElement = document.querySelector('.template')


function createCardHadler(data) {
    const newCard = new Card(data,templateElement, handleOpenCard);
    return newCard.createCard();
}

function renderCards() {
    initialCards.forEach((item) => {
        cardElements.append(createCardHadler(item));
    });
}

renderCards();

formElementAdd.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        name: placeInput.value,
        link: linkInput.value,
        alt: placeInput.value,
    }

    formElementAdd.reset()
    validInput();
    cardElements.append(createCardHadler(data));
    closePopup(popupAdd);
})

function handleOpenCard(name,link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(popupConteinerPhoto);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnEsc);
    popup.addEventListener('click', closePopupOnClick);
}

function closePopup(popup) {
    popup.removeEventListener('click', closePopupOnClick);
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnEsc);
}

function closePopupOnEsc(evt) {
    if (evt.key === 'Escape') {
        const opened = document.querySelector('.popup_opened');
        closePopup(opened)
    }
}

function closePopupOnClick(evt) {
    if (!evt.target.closest('.popup__content')) {
        closePopup(evt.currentTarget);
    }

}

btnEdit.addEventListener('click', function () {
    openPopup(popupEdit);
    nameInput.value = name.textContent
    jobInput.value = jobProfile.textContent
});
btnCloseEdit.addEventListener('click', function () {
   closePopup(popupEdit);
});

btnCloseAdd.addEventListener('click', function () {
    closePopup(popupAdd);
})

btnAdd.addEventListener('click', function () {
    openPopup(popupAdd);
    placeInput.value = '';
    linkInput.value = '';
});

// save form code

function editPopupFormHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupEdit);
}

formElementEdit.addEventListener('submit', editPopupFormHandler);
// formElementAdd.addEventListener('submit', createCardHadler);

function validInput() {
    const validCard = new FormValidate(formElementAdd, validationConfig);
    const validProfile = new FormValidate(formElementEdit, validationConfig);

    validCard.enableValidation();
    validProfile.enableValidation();
}

validInput();


