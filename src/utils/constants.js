// Popups
export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-added');
export const popupAvatar = document.querySelector('.popup-avatar');
export const confirmPopup = document.querySelector('.popup-delete');
// Buttons
export const btnEdit = document.querySelector('.profile__edit-button');
export const btnAdd = document.querySelector('.profile__add-button');
// Popup save value form
export const formElementEdit = document.querySelector('#formEdit');
export const name = document.querySelector('.profile__info-title');
export const jobProfile = document.querySelector('.profile__info-subtitle');
export const avatar = document.querySelector('.profile__avatar');
export const formElementAvatar = document.querySelector('#formAvatar');

//Cards
export const cardElements = document.querySelector('.elements')
export const popupConteinerPhoto = document.querySelector('.popup-photo')
export const formElementAdd = document.querySelector('#formAdded')


export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorSelector: 'popup__error'
};