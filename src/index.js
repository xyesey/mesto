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
         avatar, confirmPopup, popupAvatar, formElementAvatar } from './utils/constants.js';

// Function for render and create cards in class

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-52",
    headers: {
        authorization: "c14af60c-4ab1-4167-a769-5c72c322187a",
        "content-type": "application/json",
    }
})

const renderCard = new Section({
    renderer: (data) => renderCard.addItem(
        createCard(data))
}, cardElements);

const userInfo = new UserInfo({
    name: name,
    work: jobProfile,
    avatar: avatar,
});

const popupWithProfileForm = new PopupWithForm(popupEdit, (data) => {
    api.infoProfileEdit({name: data.name, about: data.work})
        .then((res) => {
            userInfo.setUserInfo({
                name: res.name, 
                work: res.about,
                avatar: res.avatar})
        })
        .then(() => popupWithProfileForm.close())
        .catch((err) => console.log(`Ошибка загрузки данных: ${err}`))
        .finally(() => popupWithProfileForm.setLoading(false));
});

const popupWithCardForm = new PopupWithForm(popupAdd, (data) => {
    api.postedCard({name: data.place, link: data.link})
    .then((res) => {
        renderCard.addItem(createCard(res, res.owner._id), true)
    })
    .then(() => popupWithCardForm.close())
    .catch((err) => console.log(`Ошибка загрузки данных: ${err}`))
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
        .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
})

const changeAvatarPopup = new PopupWithForm(popupAvatar, (data) => {
    api.setAvatar({avatar: data.link})
    .then((res) => {
        userInfo.setUserInfo(res.avatar)
    })
    .then(() => popupAvatar.close())
    .catch((err) = console.log(`Ошибка с установкой аватара: ${err}`))
    .finally(() => popupAvatar.setLoading(false))
})

const validCard = new FormValidate(formElementAdd, validationConfig);
const validProfile = new FormValidate(formElementEdit, validationConfig);
const validAvatar = new FormValidate(formElementAvatar, validationConfig);
const imagePopup = new PopupWithImage(popupConteinerPhoto);

validAvatar.enableValidation();
validCard.enableValidation();
validProfile.enableValidation();
imagePopup.setEventListeners();
popupWithProfileForm.setEventListeners();
popupWithCardForm.setEventListeners();
popupConfirm.setEventListeners();
changeAvatarPopup.setEventListeners();

function createCard(data, myId) {
    const newCard = new Card(data,templateElement, () => imagePopup.open(data.name, data.link), 
    () => { popupConfirm.open({
        id: data._id,
        callback: () => newCard.deletImageHandle(),
    })
}, 
(likedMe) => {
    if (!likedMe) {
        api.likeActive(data._id)
        .then((res) => newCard.setLike(res.likes.length))
        .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
    } else {
        api.likeInactive(data._id)
        .then((res) => newCard.removeLike(res.likes.length))
        .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
    }
}, myId, cardElements);
    return newCard.createCard();
}

// Listeners for buttons

avatar.addEventListener('click', function () {
    formElementAvatar.reset();
    changeAvatarPopup.open()
})

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
        userInfo.setUserInfo({
            name: profileData.name,
            work: profileData.about,
            avatar: profileData.avatar
        });
        renderCard.rendererItems(initialCards, myId);
    })
    .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
