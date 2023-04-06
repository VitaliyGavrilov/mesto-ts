import { enableValidation } from "./FormValidator";

//-конфиг для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  errorClass: 'popup__input-error_visible'
};

const validationMap = new Map()

export const withValidation = name => Component => (props => {
  const form = document.querySelector(`form[name="${name}"]`)

  if(form && !validationMap.has(name)) {
    enableValidation(form, validationConfig)
    validationMap.set(name, true)
  }

  return(
    <Component {...props} />
  )
})