import { Card } from './Card.js';
import { FormValidate } from './FormValidator.js';
import { initialCards } from './CardsData.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';
import { PopupWithForm } from './PopupWithForm.js';

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
const popupSelector = document.querySelectorAll('popup');
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

const renderCard = new Section({
    items: initialCards, renderer: (item) => renderCard.addItem(createCard(item))
}, cardElements);
const userInfo = new UserInfo(name, jobProfile);
const popupWithProfileForm = new PopupWithForm(popupEdit);
const popupWithCardForm = new PopupWithForm(popupAdd);
const validCard = new FormValidate(formElementAdd, validationConfig);
const validProfile = new FormValidate(formElementEdit, validationConfig);
const imagePopup = new PopupWithImage(popupConteinerPhoto);

renderCard.rendererItems();
userInfo.setUserInfo();
validCard.enableValidation();
validProfile.enableValidation();
imagePopup.setEventListeners();
popupWithProfileForm.setEventListeners();

function createCard(data) {
    const newCard = new Card(data,templateElement, imagePopup.open(popupConteinerPhoto));
    return newCard.createCard();
}

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

function handleOpenCard(name, link) {
    // popupImage.src = link;
    // popupImage.alt = name;
    // popupCaption.textContent = name;
    imagePopup.open()
}

function openEditPopup() {
    popupWithProfileForm.open();
}

function openCardPopup() {
    popupWithCardForm.open();
}

// Listeners for buttons

btnEdit.addEventListener('click', function () {
    openEditPopup(popupEdit);
    nameInput.value = name.textContent
    jobInput.value = jobProfile.textContent
});
// btnCloseEdit.addEventListener('click', function () {
//    closePopup(popupEdit);
// });

// btnCloseAdd.addEventListener('click', function () {
//     closePopup(popupAdd);
// })

btnAdd.addEventListener('click', function () {
    openCardPopup(popupAdd);
    formElementAdd.reset();
    validCard.setButtonState();
});

// Function for Falidate all Forms

// function editPopupFormHandler (evt) {
//     evt.preventDefault();
//     name.textContent = nameInput.value;
//     jobProfile.textContent = jobInput.value;
//     closePopup(popupEdit);
// }

// formElementEdit.addEventListener('submit', editPopupFormHandler);


