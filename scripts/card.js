
export class Card {
    constructor(data, templateSelector, handleOpenCards) {
        this._name = data.name;
        this._image = data.image;
        this._templateSelector = templateSelector;
        this._handleOpenCards = handleOpenCards;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector('.template')
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement
    }

    _handleOpenPopup() {
        openPopup(popupConteinerPhoto);
        popupImage.src = this._image;
        popupImage.alt = this._name;
        popupCaption.textContent = this._name;
        
    }

    _handleClosePopup() {
        popupImage.src = this._image;
        popupConteinerPhoto.classList.remove('.popup_opened');
    }

    _likeHandle() {
        this._likeBtn.classList.toggle(`element__button-like_active`);
    }

    _deletImageHandle() {
        this._element.closest('.element').remove();
        this._element = null;
    }

    _setEventListeners() {
        this._likeBtn = this._element.querySelector('.element__button-like');
        this._deleteBtn = this._element.querySelector('.element__btn-delete');
        
        this._likeBtn.addEventListener('click', () => this._likeHandle());
        this._deleteBtn.addEventListener('click', () => this._deletImageHandle());
        this._element.addEventListener('click', () => {this._handleOpenPopup()});
    }

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }

    // _handleOpenPopup() {
    //     openPopup(popupConteinerPhoto);
    //     popupImage.src = this._image;
    //     popupImage.alt = this._name;
    //     popupCaption.textContent = this._name;
        
    // }

    // _handleClosePopup() {
    //     popupImage.src = this._image;
    //     popupConteinerPhoto.classList.remove('.popup_opened');
    // }

    // _handleLike() {
    //     this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active')
    // }

    // _handleDelete() {
    //     this._element.querySelector('.element');
    //     this._element.remove()
    // }

    // _setEventListeners() {
    //     this._element.addEventListener('click', () => {
    //         this._handleOpenPopup()
    //     });

    //     btnCloseImage.addEventListener('click', () => {
    //         this._handleClosePopup()
    //     })

    //     this._element.querySelector('.element__button-like').addEventListener('click', () => {
    //         this._handleLike();
    //     })

    //     this._element.querySelector('.element__btn-delete').addEventListener('click', () => {
    //         this._handleDelete();
    //     })
    // }

    // _getTemplate() {
    //     const cardElement = document
    //     .querySelector('.template')
    //     .content
    //     .querySelector('.element')
    //     .cloneNode(true);

    //     return cardElement
    // }

    // createCard() {
    //     this._element = this._getTemplate();
    //     this._setEventListeners()

    //     this._element.querySelector('.element__image').src = this._image;
    //     this._element.querySelector('.element__title').textContent = this._name;

    //     return this._element
    // }
}


  