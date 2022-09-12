const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorSelector: 'popup__error'
};

function showError(form, input, config, errorMessage) {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(config.errorClass);
}

function hideError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    error.classList.remove(config.errorClass);
    error.textContent = '';
}

function validateInput(form, input, config) {
    if (!input.validity.valid) {
        showError(form, input, config, input.validationMessage)
    } else {
        hideError(form, input, config);
    }
}

function hasInvalidInput(inputs) {
    return inputs.some((input) => {
        return !input.validity.valid;
    })
}

function setInactiveBtn (button) {
    button.setAttribute('disabled', 'disabled');
    button.classList.add(validationConfig.inactiveButtonClass);
}

function deleteInactiveBtn (button) {
    button.removeAttribute('disabled');
    button.classList.remove(validationConfig.inactiveButtonClass);
}

function setButtonState (inputs, button) {
    if (hasInvalidInput(inputs)) {
        setInactiveBtn(button)
    } else {
        deleteInactiveBtn(button)
    }
}

function resetValidationForm(form) {
    form.reset();
}

function resetValidationError(errorList, inputList, config) {
    errorList.forEach((error) => {
        error.textContent = "";
    });

    inputList.forEach((input) => {
        input.classList.remove(config.inputErrorClass);;
    });
}

function resetFormValidation(popupList, config) {
    const btnSubmit = popupList.querySelector(config.submitButtonSelector);
    const forms = popupList.querySelector(config.formSelector);

    if (popupList.querySelector(config.formSelector)) {
        const errorList = Array.from(forms.querySelectorAll('.popup__error'));
        const inputList = Array.from(forms.querySelectorAll(config.inputSelector));
        
        resetValidationError(errorList, inputList, config);
        resetValidationForm(forms);
        setButtonState(inputList, btnSubmit, config.inactiveButtonClass);
    }
};

function setHendlers(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);

    setButtonState(inputs, button, config);
    
    inputs.forEach((input) => {
        input.addEventListener('input', function () {
            validateInput(form, input, config);
            setButtonState(inputs, button, config);
        })
    })
}

function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));

    forms.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault()
        });
        setHendlers(form, config);
    });
}

enableValidation(validationConfig);
