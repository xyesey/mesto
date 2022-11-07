import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitBtn) {
        super (popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitBtn = submitBtn;
    }

    _getInputValues() {
        return this._inputList.reduce((data, input) => {
            data[input.name] = input.value;
            return data;
        }, {})
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._submitBtn(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}