// Open and close popup

const popup = document.querySelector('.popup');
const btnEdit = document.querySelector('.profile__edit-button');
const btnClose = popup.querySelector('.popup__close-button');

// Popup save value form

let formElement = document.querySelector('#form');
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');
let popupName = document.querySelector('.profile__info-title');
let popupJob = document.querySelector('.profile__info-subtitle');
const btnSave = popup.querySelector('.popup__save-button');

// open popup code
const togglePopup = function () {
    popupValue()
    popup.classList.toggle('popup__open');
}

btnEdit.addEventListener('click', togglePopup);
btnClose.addEventListener('click', togglePopup);
btnSave.addEventListener('click', togglePopup);

// save form code

function popupValue() {
    nameInput.setAttribute('value', popupName.textContent);
    jobInput.setAttribute('value', popupJob.textContent);
  }

function formSubmitHandler (evt) {
    evt.preventDefault();
    popupName.textContent = nameInput.value;
    popupJob.textContent = jobInput.value;
    togglePopup;
}

formElement.addEventListener('submit', formSubmitHandler);