import { Card } from './scripts/Card.js';
import { FormValidate } from './scripts/FormValidator.js';
import { initialCards } from './scripts/CardsData.js';
import { Section } from './scripts/Section.js';
// import { Popup } from './scripts/Popup.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { UserInfo } from './scripts/UserInfo.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import "./pages/index.css"
import { validationConfig, popupEdit, popupAdd, btnEdit, btnAdd,
         formElementEdit, nameInput, jobInput, name, jobProfile, 
         cardElements, popupConteinerPhoto, formElementAdd, templateElement } from './utils/constants.js';

// Function for render and create cards in class

const renderCard = new Section({
    items: initialCards, renderer: (item) => renderCard.addItem(createCard(item))
}, cardElements);
const userInfo = new UserInfo({
    name: name,
    work: jobProfile,
});
const popupWithProfileForm = new PopupWithForm(popupEdit, (data) => {
    userInfo.setUserInfo({name: data.name, work: data.work});
    popupWithProfileForm.close();
});
const popupWithCardForm = new PopupWithForm(popupAdd, (data) => {
    renderCard.addItem(createCard({name: data.place, image: data.link}));
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
    popupWithProfileForm.setInputValues(userInfo.getUserInfo());
});

btnAdd.addEventListener('click', function () {
    popupWithCardForm.open();
    formElementAdd.reset();
    validCard.setButtonState();
});
