import React, { FC } from 'react';
import { ClassElement } from 'typescript';

interface PopupWithFormpProps {
  isOpen: boolean
  onClose: () => void
  title: string
  name: string
  onSubmit: (e: any) => void
  children: React.ReactNode
  submitBtnText: string
}
const PopupWithForm:FC<PopupWithFormpProps> = ({isOpen, title, name, children, submitBtnText, onClose, onSubmit }) => {
  const clikOverlay = (e: any) => {
    if(e.target.classList.contains('popup')) {
      onClose()
    }
  }
  
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} onClick={clikOverlay}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={`form-${name}`}  id={`form-${name}`} onSubmit={onSubmit} >
          <fieldset className="popup__fieldset">
            {children}
          </fieldset>
          <button className="popup__save-button" type="submit" aria-label="Кнопка сохранения данных">{submitBtnText}</button>
        </form>
        <button className="popup__close-button" type="button" aria-label="Кнопка закрытия popup" onClick={onClose}></button>
      </div>
    </div>
  )
}
export default PopupWithForm;