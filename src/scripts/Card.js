
export class Card {
    constructor(data, templateSelector, handleOpenCard, 
                handleDeleteClick, handleLikeClick, userId) {
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
        this._cardLiked = Boolean(data.likes.length >= 0);
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
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

    setLike(number) {
        this._likeBtn.classList.add("element__button-like_active");
        this._likeCounter.textContent = number;
        // this._element.querySelector('.element__like-counter').textContent = number;
        this._likedMe = true;
    }
    
    removeLike(number) {
        this._likeBtn.classList.remove("element__button-like_active");
        this._likeCounter.textContent = number;
        // this._element.querySelector('.element__like-counter').textContent = number;
        this._likedMe = false;
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
        // this._photo = this._element.querySelector('.element__image');
        
        this._likeBtn.addEventListener('click', () => this._handleBtnLike());
        this._deleteBtn.addEventListener('click', () => this._handleBtnDelete());
        this._photo.addEventListener('click', () => this._handleOpenCard());

    }

    createCard() {
        this._element = this._getTemplate();
        this._likeCounter = this._element.querySelector('.element__like-counter')
        this._photo = this._element.querySelector('.element__image');
        this._photoName = this._element.querySelector('.element__title');
        this._photo.src = this._image;
        this._photo.alt = this._name;
        this._photoName.textContent = this._name
        this._setEventListeners();
        this._removeBtnDelete();
        
        if (this._cardLiked) {
            this._likeCounter.textContent = this._likes.length;
        }

        if (this._likedMe) {
            this._likeBtn.classList.add('element__button-like_active');
        }

        return this._element;
    }
}


  