import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super (popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitBtn = this._popup.querySelector('.createBtn');
        this._submitBtnText = this._submitBtn.textContent
        this._handleSubmit = handleSubmit;
    }

    _getInputValues() {
        return this._inputList.reduce((data, input) => {
            data[input.name] = input.value;
            return data;
        }, {})
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();

            this.renderLoading(true)

            this._handleSubmit(this._getInputValues()).then(() => {
                this.renderLoading(false)
            });
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(isLoading, loadingText='Сохраниние...') {
        if (isLoading) {
            this._submitBtn.textContent = loadingText;
        } else {
            this._submitBtn.textContent = this._submitBtnText
        }
    }
}