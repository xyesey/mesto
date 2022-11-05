export class Popup {
    constructor (popupSelector) {
        this._popup = popupSelector;
        this._popupCloseBtn = this._popup.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._popupCloseBtn)
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._popupCloseBtn)
    }

    _handleEscClose(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (e) => {
            if (e.target === e.currentTarget) {
                this.close()
            }
        })

        this._popupCloseBtn.addEventListener('click', () => {
            this.close();
        })
    }
}