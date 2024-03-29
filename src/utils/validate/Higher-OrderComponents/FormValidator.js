
// при не валидности
function showInputError(inputEl, config) {
  const errorEl = document.querySelector(`#${inputEl.id}-error`);

  errorEl.classList.add(config.errorClass);
  errorEl.textContent = inputEl.validationMessage;
}
// при валидности
function hideInputError(inputEl, config) {
  const errorEl = document.querySelector(`#${inputEl.id}-error`);

  errorEl.classList.remove(config.errorClass);
  errorEl.textContent = '';
};
// проверяют валидность поля
function checkInputValidity(inputEl, config) {
  if (inputEl.validity.valid) {
    hideInputError(inputEl, config);
  } else {
    showInputError(inputEl, config);
  }
}
// изменяют состояние кнопки сабмита
// проверяет валидность для блокировки или разблокировки кнопки
function hasInvalidInput(inputList) {
  return inputList.some((inputEl) => !inputEl.validity.valid);
}
// блокирует или разблокирует кнопку
function toggleButtonState(inputList, btnEl, config) {
  if (hasInvalidInput(inputList)) {
    btnEl.classList.add(config.inactiveButtonClass);
    btnEl.disabled = true;
  } else {
    btnEl.classList.remove(config.inactiveButtonClass);
    btnEl.disabled = false;
  }
}
  // публичный метод, который сбрасывает валидацию(проверяет валидность для кнопки и убират ошибки)
function resetValidation() {
  this._inputList.forEach((inputEl) =>{
    this._hideInputError(inputEl);
    this._toggleButtonState();
  })
}
// устанавливаю все обработчики;
// навешивает слушатель на ввод данных
function setEventListeners(formEl, config) {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const btnEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, btnEl, config);


  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      checkInputValidity( inputEl, config);
      toggleButtonState(inputList, btnEl, config);
    })
  })
}

export function enableValidation(formEl, config) {
  setEventListeners(formEl, config)
}























// export default class FormValidator {
//   // принимает в конструктор объект настроек с селекторами и классами формы;
//   // принимает вторым параметром элемент той формы, которая валидируется;
//   constructor(config, formElement) {
//     // конфиг
//     this._imputSelector = config.inputSelector;// css селектор импутов
//     this._errorClass = config.errorClass;//  css селектор при ошибке
//     this._submitButtonSelector = config.submitButtonSelector;// css селектор кнопок сабмита
//     this._inactiveButtonClass = config.inactiveButtonClass;// css мод не активной кномпни сабмита
//     // элеенты формы
//     this._form = formElement;// конкретная форма, по которой можно найти импуты
//     this._inputList = Array.from(this._form.querySelectorAll(this._imputSelector));// массив импутов из получаемой формы
//     this._button = this._form.querySelector(this._submitButtonSelector);// кнопка получаемой формы
//   }
//   // приватные методы, которые обрабатывают форму:
//   // проверяют валидность поля
//   _checkInputValidity(inputEl) {
//     // const errorEl = document.querySelector(`#${inputEl.id}-error`);
//     if (inputEl.validity.valid) {
//       this._hideInputError(inputEl);
//     } else {
//       this._showInputError(inputEl);
//     }
//   }
//   // при валидности
//   _hideInputError(inputEl) {
//     const errorEl = document.querySelector(`#${inputEl.id}-error`);
//     errorEl.classList.remove(this._errorClass);
//     errorEl.textContent = '';
//   };
//   // при не валидности
//   _showInputError(inputEl) {
//     const errorEl = document.querySelector(`#${inputEl.id}-error`);
//     errorEl.classList.add(this._errorClass);
//     errorEl.textContent = inputEl.validationMessage;
//   }
//   // изменяют состояние кнопки сабмита
//   // проверяет валидность для блокировки или разблокировки кнопки
//   _hasInvalidInput() {
//     return this._inputList.every((inputElement) => inputElement.validity.valid);
//   }
//   // блокирует или разблокирует кнопку
//   _toggleButtonState() {
//     if (this._hasInvalidInput()) {
//       this._removeDisabledButton()
//     } else {
//       this._addDisabledButton()
//     }
//   }
//   // блокирует кнопку
//   _addDisabledButton() {
//     this._button.classList.add(this._inactiveButtonClass);
//     this._button.disabled = true;
//   }
//   // разблокирует кнопку
//   _removeDisabledButton() {
//     this._button.classList.remove(this._inactiveButtonClass);
//     this._button.disabled = false;
//   }
//   // устанавливаю все обработчики;
//   // навешивает слушатель на ввод данных
//   _setEventListeners() {
//     this._inputList.forEach((inputEl) =>{
//       inputEl.addEventListener('input', () => {
//         this._checkInputValidity(inputEl);
//         this._toggleButtonState();
//       })
//     })
//   }
//   // публичные методы
//   // публичный метод, который сбрасывает валидацию(проверяет валидность для кнопки и убират ошибки)
//   resetValidation() {
//     this._inputList.forEach((inputEl) =>{
//       this._hideInputError(inputEl);
//       this._toggleButtonState();
//     })
//   }
//   // публичный метод enableValidation, который включает валидацию формы.
//   enableValidation() {
//     this._setEventListeners();
//   }
// }
