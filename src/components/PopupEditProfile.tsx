import React, { FC, useContext, useEffect, useState } from 'react';
import User from '../types/typeCurrentUser';
import PopupWithForm from './PopupWithForm';
import PopupSubmitProps from '../types/typePopupProps';



const PopupEditProfile: FC<PopupSubmitProps> =({isOpen, onClose, submit, userData}) => {
  // Стейт-переменные
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(userData.name);
    setDescription(userData.about);
  }, [userData, isOpen]);
  // Обработчик сабмита
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit({ name: name, about: description, avatar: userData.avatar });
  }
  // Считываем данные импутов
  function handleName(event: React.ChangeEvent<HTMLInputElement>) { setName(event.target.value) }
  function handleDescription(event: React.ChangeEvent<HTMLInputElement>) { setDescription(event.target.value) }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitBtnText='Сохранить'
      name='edit-profile'
      title='Редактировать профиль'>
      <input className="popup__input popup__input_data_name"
        value={name || ''} onChange={handleName}
        type="text" name="name" id="name" placeholder="Имя" autoComplete="off"  required />
      <span className="popup__input-error" id="name-error"></span>
      <input className="popup__input popup__input_data_profession"
        value={description || ''} onChange={handleDescription}
        type="text" name="profession" id="profesion" placeholder="Вид деятельности" autoComplete="off"  required />
      <span className="popup__input-error" id="profesion-error"></span>
    </PopupWithForm>
  )
}
export default PopupEditProfile;