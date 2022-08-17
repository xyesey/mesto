// Open and close popup

const popup = document.querySelector('.popup');
const btnEdit = document.querySelector('.profile__info-edit__buttom');
const btnClose = popup.querySelector('.popup__close-button');

// Popup save value form

let formElement = document.querySelector('#form');
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');
let popupName = document.querySelector('.profile__info-title');
let popupJob = document.querySelector('.profile__info-subtitle');
const btnSave = popup.querySelector('.popup__save-button');

// Button like active 

/*const btnLike = document.querySelectorAll('.element__button-like');

function likeActive(e) {
    btnLike.e.target.classList.toggle('like__active');
}
btnLike.addEventListener('click', likeActive);*/

/*const btnsLike = document.querySelectorAll('.element__button-like');

btnsLike.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        console.log('button clicked' + e.target.classList);
    })
})*/

/*const btnLike = document.querySelectorAll('.element__button-like');

const likeActive = function() {
    btnLike.classList.toggle('like__active');
    console.log('hi');
}

btnLike.addEventListener('click', likeActive);*/

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