const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
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

// function setInactiveBtn (button) {
//     button.setAttribute('disabled', 'disabled');
//     button.classList.add(validationConfig.inactiveButtonClass);
// }

// function deleteInactiveBtn (button) {
//     button.removeAttribute('disabled');
//     button.classList.remove(validationConfig.inactiveButtonClass);
// }

// function setButtonState (inputs, button) {
//     if (hasInvalidInput(inputs)) {
//         setInactiveBtn(button)
//     } else {
//         deleteInactiveBtn(button)
//     }
// }

function setHendlers(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);

    // setButtonState(inputs, button, config);
    
    inputs.forEach((input) => {
        input.addEventListener('input', function () {
            validateInput(form, input, config);
            // setButtonState(inputs, button, config);
        })
    })
}

function enableValidation(config) {
    const forms = Array.from(document.querySelector(config.formSelector));

    forms.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault()
        });
        setHendlers(form, config);
    });
}

enableValidation(validationConfig);


// function setButtonState(inputs, button, config) {
//     if (hasInvalidInput(inputs)) {
//         button.disabled = true;
//         button.classList.remove(config.inactiveButtonClass);
//     } else {
//         button.disabled = false;
//         button.classList. add(config.inactiveButtonClass);
//     }
// }
