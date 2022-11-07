import { Card } from './scripts/Card.js';
import { FormValidate } from './scripts/FormValidator.js';
import { initialCards } from './scripts/CardsData.js';
import { Section } from './scripts/Section.js';
import { Popup } from './scripts/Popup.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { UserInfo } from './scripts/UserInfo.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import "./pages/index.css"

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
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-added');
// Buttons
const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button');
// Popup save value form
const formElementEdit = document.querySelector('#formEdit');
const nameInput = formElementEdit.querySelector('#nameInput');
const jobInput = formElementEdit.querySelector('#jobInput');
const name = document.querySelector('.profile__info-title');
const jobProfile = document.querySelector('.profile__info-subtitle');
//Cards
const cardElements = document.querySelector('.elements')
const popupConteinerPhoto = document.querySelector('.popup-photo')
const formElementAdd = document.querySelector('#formAdded')
const templateElement = document.querySelector('.template')

// Function for render and create cards in class

const renderCard = new Section({
    items: initialCards, renderer: (item) => renderCard.addItem(createCard(item))
}, cardElements);
const userInfo = new UserInfo({
    name: name,
    work: jobProfile,
});
const popupWithProfileForm = new PopupWithForm(popupEdit, (data) => {
    userInfo.setUserInfo({name: data.name, work: data.work}, console.log(data));
    popupWithProfileForm.close();
});
const popupWithCardForm = new PopupWithForm(popupAdd, (data) => {
    cardElements.prepend(createCard({name: data.place, image: data.link}));
    popupWithCardForm.close();
});
const validCard = new FormValidate(formElementAdd, validationConfig);
const validProfile = new FormValidate(formElementEdit, validationConfig);
const imagePopup = new PopupWithImage(popupConteinerPhoto);

renderCard.rendererItems();
validCard.enableValidation();
validProfile.enableValidation();
imagePopup.setEventListeners();
popupWithProfileForm.setEventListeners();
popupWithCardForm.setEventListeners();

function createCard(data) {
    const newCard = new Card(data,templateElement, () => imagePopup.open(data.name, data.image));
    return newCard.createCard();
}

// Listeners for buttons

btnEdit.addEventListener('click', function () {
    popupWithProfileForm.open();
    const value = userInfo.getUserInfo()
    nameInput.value = value.name
    jobInput.value = value.work
});

btnAdd.addEventListener('click', function () {
    popupWithCardForm.open();
    formElementAdd.reset();
    validCard.setButtonState();
});
