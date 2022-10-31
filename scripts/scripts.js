import { Card } from './card.js';
import { FormValidate } from './formValidator.js';
import { initialCards } from './cardsData.js';

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

// Function for render and create cards in class

function createCard(data) {
    const newCard = new Card(data,templateElement, handleOpenCard);
    return newCard.createCard();
}

function renderCards() {
    initialCards.forEach((item) => {
        cardElements.append(createCard(item));
    });
}

renderCards();

formElementAdd.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        name: placeInput.value,
        link: linkInput.value,
    }
    
    formElementAdd.reset();
    cardElements.prepend(createCard(data));
    closePopup(popupAdd);
})

function handleOpenCard(name,link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(popupConteinerPhoto);
}

// Funtion for open and close popup

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

// Listeners for buttons

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
    formElementAdd.reset();
});

// Function for Falidate all Forms

function editPopupFormHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupEdit);
}

formElementEdit.addEventListener('submit', editPopupFormHandler);

function validInput() {
    const validCard = new FormValidate(formElementAdd, validationConfig);
    const validProfile = new FormValidate(formElementEdit, validationConfig);

    validCard.enableValidation();
    validProfile.enableValidation();
}

validInput();


