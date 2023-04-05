import React, {FC} from 'react';
import CardEl from '../types/typeCard';
import PopupWithForm from './PopupWithForm';
import {Link, useNavigate} from 'react-router-dom'

interface PopupBuyCardProps {
  isOpen: boolean
  onClose: () => void
  data: CardEl
  selectedProduct: (bo: boolean) => void
}

const PopupBuyCard: FC<PopupBuyCardProps> = ({isOpen, onClose, data, selectedProduct}) => {
  const navigate = useNavigate();
  const payPage = () => {
    onClose()
    selectedProduct(true)
    navigate(`/about`);
  };
  
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__title">Покупка карточки</h2>
        <h3>{`Карточка: ${data.name}`}</h3>
        <h3>{`Создатель: ${data.owner.name}, ${data.owner.about}`}</h3>
        <h3>{`Цена: ${data.likes.length > 0 ? data.likes.length * 10 : 10} $`}</h3>
        
        <button className="popup__save-button" type="button" aria-label="Кнопка сохранения данных" onClick={payPage}>Оформить покупку</button>
        <button className="popup__close-button" type="button" aria-label="Кнопка закрытия popup" onClick={onClose}></button>
      </div>
    </div>
  )
}
export default PopupBuyCard;