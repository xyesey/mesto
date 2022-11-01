export class FormValidate {
    constructor(form, validationConfig) {
        this._form = form;
        this._inputSelector = validationConfig.inputSelector
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._button = this._form.querySelector(this._submitButtonSelector);
    }
    
    _showError(input, error) {
        input.classList.add(this._inputErrorClass);
        error.classList.add(this._errorClass);
        error.textContent = input.validationMessage;
    }

    _hideError(input, error) {
        input.classList.remove(this._inputErrorClass);
        error.classList.remove(this._errorClass);
        error.textContent = '';
    }

    _checkValidation(input) {
        const error = document.querySelector(`#${input.id}-error`);

        if (!input.validity.valid) {
            this._showError(input, error)
        } else {
            this._hideError(input, error)
        }
    };

    _isInvalidInput() {
        return this._inputList.some((input) => {
            return !input.validity.valid;
        });
    }

    addDisabledButton() {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.setAttribute('disabled', 'disabled')
    }

    removeDisabledButton() {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.removeAttribute('disabled');
    }

    setButtonState() {
       
        if (this._isInvalidInput()) {
            // this._button.classList.add(this._inactiveButtonClass);
            // this._button.setAttribute('disabled', 'disabled')
            this.addDisabledButton();
        } else {
            // this._button.classList.remove(this._inactiveButtonClass);
            // this._button.removeAttribute('disabled');
            this.removeDisabledButton();
        }
    };


    _setListeners() {
        this._button
        this.setButtonState()
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkValidation(input)
                this.setButtonState();
            })
        })
    }

    resetValidation() {
        this._inputList.forEach((input) => {
            if (input.validity.valid) {
                this._hideError(input, error)
            }
            this.setButtonState();
        })
    }

    enableValidation() {
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
        })
        this._setListeners();
    }

}

