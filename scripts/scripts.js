
// Popups

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup-edit');
const popupAdded = document.querySelector('.popup-added');

// Buttons

const btnCloseAdded = popupAdded.querySelector('.popup__close-button');
const btnCloseEdit = popupEdit.querySelector('.popup__close-button');
const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button');
const btnSave = popup.querySelector('.editBtn');

// Popup save value form

const formElementEdit = document.querySelector('#formEdit');
const nameInput = formElementEdit.querySelector('#nameInput');
const jobInput = formElementEdit.querySelector('#jobInput');
const popupName = document.querySelector('.profile__info-title');
const popupJob = document.querySelector('.profile__info-subtitle');


// buttons 
const togglePopup = function (popupElement) {
    popupElement.classList.toggle('popup_opened');
}

btnEdit.addEventListener('click', function () {
    togglePopup(popupEdit);
});
btnCloseEdit.addEventListener('click', function () {
    popupEdit.classList.toggle('popup_opened');
});

btnCloseAdded.addEventListener('click', function () {
    popupAdded.classList.toggle('popup_opened');
})


btnSave.addEventListener('click', function () {
    popupValue();
});
btnAdd.addEventListener('click', function () {
    togglePopup(popupAdded);
});


// save form code

function popupValue() {
    nameInput.setAttribute('value', popupName.textContent);
    jobInput.setAttribute('value', popupJob.textContent);
  }

function formSubmitHandler (evt) {
    evt.preventDefault();
    popupName.textContent = nameInput.value;
    popupJob.textContent = jobInput.value;
    togglePopup(popupEdit);
}

formElementEdit.addEventListener('submit', formSubmitHandler);