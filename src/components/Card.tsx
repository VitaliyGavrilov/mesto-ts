//Импорты
import React, { FC } from 'react';
import CardEl from '../types/typeCard';
import User from '../types/typeCurrentUser';
//Типы данных для пропсов карточек
interface CardProps {
  card: CardEl;
  openPopupImg: (card: CardEl) => void
  openPopupDeleteCard: (card: CardEl) => void
  openPopupBuyCard: (card: CardEl) => void
  likeClick: (card: CardEl) => void
  profileData: User
}
//Конструируем карточку
const Card:FC<CardProps> = ({card, openPopupImg, openPopupDeleteCard, openPopupBuyCard, likeClick, profileData}) => {
  // ---Определяем состояние кнопки лайка и кнопки удаления карточки 
  // Определение владения карточкой(сравниваем id создателя карточки и id текущего пользователя)
  const isOwn: boolean = card.owner._id === profileData._id;
  // Определение наличие поставленного лайка(сравниваем id пользователей которые поставили лайк с id текущего пользователя)
  const isLiked: boolean = card.likes.some(item => item._id === profileData._id);
  // Cоздаем переменную для именни класса лайка
  const cardLikeButtonClassName: string = (
    `element__like-button ${isLiked && 'element__like-button_active'}`
  );
  // ---Функции взаимодействия с карточкой
  function handleCardClick () { openPopupImg(card) }//клик на карточку
  function handleDeleteCardClick () { openPopupDeleteCard(card) }//клик на корзину карточки
  function handleLikeCardClick () { likeClick(card) }//клик на лайк
  function handleBuyCardClick () {openPopupBuyCard(card)}
  // ---Собираем карточку
  return (
    <div className="element__container">
      {isOwn // создатель карточки может ее удалить но не купить, другие пользователи могут покупать не свои карточки, не могут удалть чужие 
      ? <button className="element__delete-button" onClick={handleDeleteCardClick} ></button> //если создатель карточки это текущий пользователь то будет кнопка удаления карточки  
      : <button className="element__buy-button" onClick={handleBuyCardClick} ></button> //если создатель карточки другой пользователь то вместо кнопки удаления карточки будет кнопка покупки карточки 
      }
      <img className="element__img" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <div className="element__block">
        <h2 className="element__name">{card.name}</h2>
        <div className ="element__like-block">
          <button className={cardLikeButtonClassName} type="button" aria-label="Кнопка лайка" onClick={handleLikeCardClick}></button>
          <span className="element__likes-number">{card.likes.length > 0 ? card.likes.length : null}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;