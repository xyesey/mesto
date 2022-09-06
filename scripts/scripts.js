
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

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}


btnEdit.addEventListener('click', function () {
    fillPopupEditInputs();
    openPopup(popupEdit);
});
btnCloseEdit.addEventListener('click', function () {
   closePopup(popupEdit);
});

btnCloseAdd.addEventListener('click', function () {
    closePopup(popupAdd);
})

btnAdd.addEventListener('click', function () {
    openPopup(popupAdd);
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
    closePopup(popupEdit);
}

formElementEdit.addEventListener('submit', editPopupFormHandler);
