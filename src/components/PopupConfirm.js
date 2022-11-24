import { Popup } from "./Popup";

export class PopupConfirm extends Popup {
    constructor(popupElement, callback) {
        super(popupElement);
        this._confirmBtn = this._popup.querySelector('.popup__confirm-button');
        this._callback = callback;
    }

    open(data) {
        super.open()
        this._data = data
    }

    setEventListeners() {
        super.setEventListeners()
        this._confirmBtn.addEventListener('click', () => {
            this._callback(this._data)
        })
    }
}