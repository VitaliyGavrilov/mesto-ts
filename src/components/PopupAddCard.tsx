import React, { FC, useEffect, useRef, useState } from 'react';
import CardEl from '../types/typeCard.js';
import User from '../types/typeCurrentUser';
import PopupWithForm from './PopupWithForm';

interface PopupAddCardProps {
  isOpen: boolean
  onClose: () => void
  submit: (name: string, link: string) => void
  // cardsData: CardEl[]
}

const PopupAddCard: FC<PopupAddCardProps> = ({isOpen, onClose, submit}) => {
  // Рефы названия и картинки карточки
  const [cardName, setCardName] = useState<string>('');
  const [cardLink, setCardLink] = useState<string>('');
  // Эффект для очистки полей
  useEffect(() => {
    setCardName('')
    setCardLink('')
  }, [isOpen]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit( cardName, cardLink );
  }

  function handleCardName(event: React.ChangeEvent<HTMLInputElement>) { setCardName(event.target.value) }
  function handleCardLink(event: React.ChangeEvent<HTMLInputElement>) { setCardLink(event.target.value) }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitBtnText='Создать'
      name='add-card'
      title='Новое место'>
      <input className="popup__input popup__input_card-name" onChange={handleCardName}
        type="text" name="name" id="card-name" placeholder="Название" autoComplete="off" required />
      <span className="popup__input-error" id="card-name-error"></span>
      <input className="popup__input popup__input_img-link" onChange={handleCardLink}
        type="url" name="link" id="link-img" placeholder="Сылка на картинку" autoComplete="off" required />
      <span className="popup__input-error" id="link-img-error"></span>
    </PopupWithForm>
  )
}

export default PopupAddCard;