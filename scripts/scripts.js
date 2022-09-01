
// Popups

const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-added');

// Buttons

const btnCloseAdd = popupAdd.querySelector('.popup__close-button');
const btnCloseEdit = popupEdit.querySelector('.popup__close-button');
const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button');

// Popup save value form

const formElementEdit = document.querySelector('#formEdit');
const nameInput = formElementEdit.querySelector('#nameInput');
const jobInput = formElementEdit.querySelector('#jobInput');
const name = document.querySelector('.profile__info-title');
const jobProfile = document.querySelector('.profile__info-subtitle');


// buttons 
const togglePopup = function (popupElement) {
    popupElement.classList.toggle('popup_opened');
}

btnEdit.addEventListener('click', function () {
    fillPopupEditInputs();
    togglePopup(popupEdit);
});
btnCloseEdit.addEventListener('click', function () {
   togglePopup(popupEdit);
});

btnCloseAdd.addEventListener('click', function () {
    togglePopup(popupAdd);
})

btnAdd.addEventListener('click', function () {
    togglePopup(popupAdd);
});


// save form code

function fillPopupEditInputs() {
    nameInput.setAttribute('value', name.textContent);
    jobInput.setAttribute('value', jobProfile.textContent);
  }

function editPopupFormHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    togglePopup(popupEdit);
}

formElementEdit.addEventListener('submit', editPopupFormHandler);