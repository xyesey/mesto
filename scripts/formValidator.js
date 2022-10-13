export class FormValidate {
    constructor(form, validationConfig) {
        this._form = form;
        this._input = validationConfig.input;
        this._submitBtn = validationConfig._submitBtn;
        this._submitBtnInactive = validationConfig.submitBtnInactive;
        this._inputError = validationConfig.inputError;
        this._errorClass = validationConfig._errorClass;
        // this._error = objct.error;

        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._btn = this._form.querySelector(this._submitBtn);
    }

    _showError(input) {
        input.classList.add(this._inputError);
        this._error.classList.add(this._errorClass);
        this._error.textContent = input.validationMessage;
   }

   _hideError(input) {
        input.classList.add(this._submitBtnInactive);
        this._error.classList.remove(this._errorClass);
        this._error.textContent = '';
   }

   _hasInputInvalid() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
   }

   _validateInput(input) {
        this._error = this._form.querySelector(`.${input.id}-error`);

        if (!input.validity.valid) {
            this._showError(input)
        } else {
            this._hideError(input)
        }
   }

   _toggleSubmitBtn() {
        if (this._hasInputInvalid()) {
            this._btn.classList.add(this._submitBtnInactive);
            this._btn.setAttribute('disabled', true)
        } else {
            this._btn.classList.remove(this._submitBtnInactive);
            this._btn.removeAttribute('disabled')
        }
   }

   _setEventListeners() {
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._validateInput(input)
                this._toggleSubmitBtn()
            })
        })
   }

   FormValidate() {
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    this._setEventListeners();
   }

   removeValidation() {
    this._inputList.forEach((input) => {
        if (input.validity.valid) {
            this._hideError(input);
        }
        this._toggleSubmitBtn();
    })
   }
}

// export class FormValidate {
//     constructor(form, validationConfig) {
//         this._formPopup = validationConfig.formPopup;
//         this._errorSelector = validationConfig.errorSelector;
//         this._inputErrorClass = validationConfig.inputErrorClass;
//         this._inputSelector = validationConfig.inputSelector;
//         this._submitButtonSelector = validationConfig.submitButtonSelector;
//         this._form = form;
//         this._validationConfig = validationConfig;
//     }

//     _showError(input) {
//         this.errorElement = document.querySelector(`.${input.id}-error`);
//         this._errorMessage = input.validationConfig;
//         input.classList.add(this._inputErrorClass);
//         this._errorElement.textContent = this._errorMessage;
//     }

//     _hideError(input) {
//         this._errorElement = document.querySelector(`.${input.id}-error`);
//         input.classList.remove(this._inputErrorClass);
//         this._errorElement.textContent = "";
//     }

//     _checkValidityInput(input) {
//         if (!input.checkValidity()) {
//             this._showError(input);
//         } else {
//             this._hideError(input);
//         }
//     }

//     _setButtonDisabled() {
//         this._isFormValid = this._inputList.every(({validity}) => validity.valid);

//         if (this._isFormValid) {
//             this._submitButtonSelector.removeAttribute("disabled");
//         } else {
//             this._submitButtonSelector.setAttribute("disabled", true);
//         }
//     }

//     _setListeners() {
//         this._inputList = Array.from(
//             this._form.querySelectorAll(this._inputSelector));

//         this.btnSubmit = this._form.querySelector(this._submitButtonSelector);

//         this._setButtonDisabled();

//         this._inputList.forEach((input) => {
//             input.addEventListener("input", (e) => {
//                 e.preventDefualt();
//                 this._checkValidityInput(input);
//                 this._setButtonDisabled()
//             })
//         })
//     }

//     enableValidate() {
//         this._setListeners();
//     }
// }