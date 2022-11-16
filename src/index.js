import { Card } from './scripts/Card.js';
import { FormValidate } from './scripts/FormValidator.js';
import { Section } from './scripts/Section.js';
import { Api } from './scripts/Api.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { UserInfo } from './scripts/UserInfo.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { PopupConfirm } from './scripts/PopupConfirm.js';
import "./pages/index.css"
import { validationConfig, popupEdit, popupAdd, btnEdit, btnAdd,
         formElementEdit, name, jobProfile, 
         cardElements, popupConteinerPhoto, formElementAdd, templateElement, 
         avatarProfile, confirmPopup } from './utils/constants.js';

// Function for render and create cards in class

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-52",
    headers: {
        authorization: "c14af60c-4ab1-4167-a769-5c72c322187a",
        "content-type": "application/json",
    }
})

const renderCard = new Section({
    renderer: (item, myId) => renderCard.addItem(createCard(item, myId))
}, cardElements);

// const renderCard = new Section({
//     renderer: (data) => {
//         renderCard.addItem(createCard(data))
//     }
// }, cardElements);

const userInfo = new UserInfo({
    name: name,
    work: jobProfile,
    avatar: avatarProfile,
});
// const popupWithProfileForm = new PopupWithForm(popupEdit, (data) => {
//     userInfo.setUserInfo({name: data.name, work: data.work});
//     popupWithProfileForm.close();
// });
const popupWithProfileForm = new PopupWithForm(popupEdit, (data) => {
    api.infoProfileEdit({name: data.name, work: data.work})
        .then((res) => {
            userInfo.setUserInfo(res.name, res.work, res.avatar)
        })
        .then(() => popupWithProfileForm.close())
        .catch((err) => console.log(err.message))
        .finally(() => popupWithProfileForm.setLoading(false));
});
// const popupWithCardForm = new PopupWithForm(popupAdd, (data) => {
//     renderCard.addItem(createCard({name: data.place, image: data.link}));
//     popupWithCardForm.close();
// });
const popupWithCardForm = new PopupWithForm(popupAdd, (data) => {
    api.postedCard({name: data.place, image: data.link})
    .then((res) => {
        renderCard.addItem(postedCard(res, res.owner._id), true)
    })
    .then(() => popupWithCardForm.close())
    .catch((err) => console.log(err.message))
    .finally(() => popupWithCardForm.setLoading(false));
});
const popupConfirm = new PopupConfirm(confirmPopup, ({id, callback}) => {
    api.deleteCard(id)
        .then(() => {
            callback();
        })
        .then(() => {
            popupConfirm.close();
        })
        .catch((err) => {
            console.log(err)
        });
})
const validCard = new FormValidate(formElementAdd, validationConfig);
const validProfile = new FormValidate(formElementEdit, validationConfig);
// const validAvatar = new FormValidate()
const imagePopup = new PopupWithImage(popupConteinerPhoto);

renderCard.rendererItems();
validCard.enableValidation();
validProfile.enableValidation();
imagePopup.setEventListeners();
popupWithProfileForm.setEventListeners();
popupWithCardForm.setEventListeners();
popupConfirm.setEventListeners();

function createCard(data, myId) {
    const newCard = new Card(data,templateElement, () => imagePopup.open(data.name, data.image), 
    () => { popupConfirm.open({
        id: data._id,
        callback: () => newCard.deletImageHandle(),
    })
}, 
(likedMe) => {
    if (!likedMe) {
        api.likeActive(data._id)
        .then((res) => {
            newCard.handleLikeCounter(res.likes.length);
        })
        .catch((err) => console.log(err.message));
    } else {
        api.likeInactive(data._id)
        .then((res) => newCard.handleLikeCounter(res.likes.length))
        .catch((err) => console.log(err.message))
    }
}, myId, cardElements);
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

Promise.all([api.getInfoProfile(), api.getInitialCards()])
    .then(([profileData, initialCards]) => {
        const myId = profileData._id;
        userInfo.setUserInfo(profileData.name, profileData.work, profileData.avatar);
        renderCard.addItem(initialCards, myId)
    })
    .catch((err) => console.log(err.message));
