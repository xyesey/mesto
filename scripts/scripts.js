
// Popups
const popupList = document.querySelectorAll('popup');
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


// functiom close popup


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

// buttons

btnEdit.addEventListener('click', function () {
    fillPopupEditInputs();
    openPopup(popupEdit);
    resetFormValidation(popupEdit, validationConfig);
    deleteInactiveBtn(btnEdit, validationConfig);
});
btnCloseEdit.addEventListener('click', function () {
   closePopup(popupEdit);
});

btnCloseAdd.addEventListener('click', function () {
    closePopup(popupAdd);
})

btnAdd.addEventListener('click', function () {
    openPopup(popupAdd);
    resetFormValidation(popupAdd, validationConfig);
    setInactiveBtn(btnAdd, validationConfig);
});


// save form code

function fillPopupEditInputs() {
    nameInput.value = name.textContent
    jobInput.value = jobProfile.textContent
  }

function editPopupFormHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupEdit);
}

formElementEdit.addEventListener('submit', editPopupFormHandler);
