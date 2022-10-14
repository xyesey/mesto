export class FormValidate {
    constructor(validationConfig, form) {
        this._formSelector = validationConfig.formSelector;
        this._inputSelector = validationConfig.inputSelector
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._form = form;
        this._validationConfig = validationConfig;
    }
    
    _showError(input) {
        this._error = document.querySelector(`.${input}-error`);
        this._msgError = input.validationMessage;
        input.classList.add(this._inputErrorClass);
        this._error.textContent = this._msgError;
    }

    hideError(input) {
        this._error = document.querySelector(`.${input}-error`);
        input.classList.remove(this._inputErrorClass);
        this._error.textContent = "";
    }

    _checkValidation(input) {
        if (!input.checkValidity()) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    };

    _setButton() {
        this._isFormValid = this._formInputs.every(({ validity }) => validity.valid);

        if (this._isFormValid) {
            this._popupSubmitButton.removeAttribute("disabled");
        } else {
            this._popupSubmitButton.setAttribute("disabled", "disabled");
        }
    };

    _validateInputs() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));

        this._popupSubmitButton = this._form.querySelector(this._submitButtonSelector);
        this._setButton();

        this._inputList.forEach((input) => {
            input.addEventListener("input", (e) => {
                e.preventDefault();
                this._checkValidation(input);
                this._setButton();
            })
        })
    }

    enableValidation() {
        this._validateInputs();
    }

}
