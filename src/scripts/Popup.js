export class Popup {
    constructor (popupElement) {
        this._popup = popupElement;
        this._popupCloseBtn = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            this.close();
        }
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose)
    }

    setEventListeners() {
        this._popup.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup__body')) {
                this.close();
            }
        });

        this._popupCloseBtn.addEventListener('click', () => {
            this.close();
        })
    }
}