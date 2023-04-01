import { useEffect, useRef, FC , useState} from 'react';
import PopupWithForm from './PopupWithForm';
import PopupSubmitProps from '../types/typePopupProps';

const PopupEditAvatar: FC<PopupSubmitProps> = ({isOpen, onClose, submit, userData}) => {
  const [avatar, setAvatar] = useState<string>('');
  // Эффект для очистки формы
  // useEffect(() => { avatarRef.current.value = '' }, [isOpen]);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit({ name: userData.name, about: userData.about, avatar: avatar });
  }

  function handleAvatar(event: React.ChangeEvent<HTMLInputElement>) { setAvatar(event.target.value) }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitBtnText='Сохранить'
      name='edit-avatar'
      title='Обновить аватар'>
      <input className="popup__input popup__input_link_avatar" onChange={handleAvatar}
        type="url" name="avatar" id="avatar" placeholder="Сылка на аватар" autoComplete="off" required />
      <span className="popup__input-error" id="avatar-error"></span>
    </PopupWithForm>
  )
}
export default PopupEditAvatar;