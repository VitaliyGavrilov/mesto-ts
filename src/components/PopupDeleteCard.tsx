import React, {FC} from 'react';
import CardEl from '../types/typeCard';
import PopupWithForm from './PopupWithForm';

interface PopupDeleteCardProps {
  isOpen: boolean
  onClose: () => void
  data: CardEl
  submit: (card: CardEl) => void
}

const PopupDeleteCard: FC<PopupDeleteCardProps> = ({isOpen, onClose, data, submit}) => {
  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    submit(data);
  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      name='delete-card'
      title='Вы уверены?'
      submitBtnText='Да'
    >
    </PopupWithForm>
  )
}
export default PopupDeleteCard;