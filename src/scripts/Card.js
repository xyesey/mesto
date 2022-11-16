
export class Card {
    // constructor(data, templateSelector, handleOpenCard) {
    //     this._name = data.name;
    //     this._image = data.image;
    //     this._templateSelector = templateSelector;
    //     this._handleOpenCard = handleOpenCard;
    // }

    constructor(data, templateSelector, handleOpenCard, 
                handleLikeClick, handleDeleteClick, userId) {
        this._name = data.name;
        this._image = data.link;
        this._myId = userId;
        this._owner = data.owner._id;
        this._likes = data.likes;

        this._templateSelector = templateSelector;
        this._handleOpenCard = handleOpenCard;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;

        this._likedMe = Boolean(this._likes.find(like => like._id === this._myId));
        this._cardLiked = Boolean(data.likes.lengtn >= 0);
    }

    _getTemplate() {
        const cardElement = document
        .querySelector('.template') // Попробовать поиск через this._templateSelector
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement
    }

    _handleBtnDelete() {
        this._handleDeleteClick();
    }

    _handleBtnLike() {
        this._handleLikeClick(this._likedMe)
    }

    handleLikeCounter(number) {
        this._element.querySelector('.element__like-counter').textContent = number;

        if (this._likeHandle()) {
            this._element.querySelector('.element__button-like')
                .classList.add('element__button-like_active')
        } else {
            this._element.querySelector('.element__button-like')
                .classList.remove('element__button-like_active')
        }
    }

    deletImageHandle() {
        this._element.remove();
        this._element = null;
    }
    
    _handleOpenCard() {
        this._handleOpenCard(this._name, this._image)
    }

    _removeBtnDelete() {
        if (this._owner !== this._myId) {
            this._deleteBtn.classList.add('element__btn-delete_hide');
        }
    }

    _setEventListeners() {
        this._likeBtn = this._element.querySelector('.element__button-like');
        this._deleteBtn = this._element.querySelector('.element__btn-delete');
        this._img = this._element.querySelector('.element__image');
        
        this._likeBtn.addEventListener('click', () => this._handleBtnLike());
        this._deleteBtn.addEventListener('click', () => this._handleBtnDelete());
        this._img.addEventListener('click', () => this._handleOpenCard());

    }

    createCard() {
        this._element = this._getTemplate();
        this._photo = this._element.querySelector('.element__image');
        this._photoName = this._element.querySelector('.element__title');
        this._photo.src = this._image;
        this._photo.alt = this._name;
        this._photoName.textContent = this._name
        this._setEventListeners();
        this._removeBtnDelete();
        
        if (this._cardLiked) {
            this._element.querySelector('.element__like-counter')
                .textContent = this._likes.lengtn;
        }

        if (this._likedMe) {
            this._likeBtn.classList.add('element__button-like_active');
        }

        return this._element;
    }
}


  