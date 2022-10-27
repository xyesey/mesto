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
    
    _showError(input) {
        input.classList.add(this._inputErrorClass);
        this._error.classList.add(this._errorClass);
        this._error.textContent = input.validationMessage;
    }

    _hideError(input) {
        input.classList.remove(this._inputErrorClass);
        this._error.classList.remove(this._errorClass);
        this._error.textContent = '';
    }

    _checkValidation(input) {
        this._error = document.querySelector(`#${input.id}-error`);

        if (!input.validity.valid) {
            this._showError(input)
        } else {
            this._hideError(input)
        }
    };

    _isInvalidInput() {
        return this._inputList.some((input) => {
            return !input.validity.valid;
        });
    }

    setButtonState() {
       
        if (this._isInvalidInput()) {
            this._button.classList.add(this._inactiveButtonClass);
            this._button.setAttribute('disabled', 'disabled')
        } else {
            this._button.classList.remove(this._inactiveButtonClass);
            this._button.removeAttribute('disabled');
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
                this._hideError(input)
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

