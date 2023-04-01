import React, { FC } from 'react';
import CardEl from '../types/typeCard';

interface CardProps {
  // key: number;
  link: string;
  name: string;
  like: number;
  card: CardEl;
  openPopupImg: (card: CardEl) => void
  openPopupDeleteCard: (card: CardEl) => void
}

const Card:FC<CardProps> = ({link, name, like, card, openPopupImg, openPopupDeleteCard}) => {

  function handleCardClick () { openPopupImg(card) }//клик на карточку
  function handleDeleteCardClick () { openPopupDeleteCard(card) }//клик на корзину карточки

  return (
    <div className="element__container">
      <button className="element__delete-button" onClick={handleDeleteCardClick}  ></button>
      <img className="element__img" src={link} alt={name} onClick={handleCardClick}/>
      <div className="element__block">
        <h2 className="element__name">{name}</h2>
        <div className ="element__like-block">
          <button className="element__like-button" type="button" aria-label="Кнопка лайка"></button>
          <span className="element__likes-number">{like > 0 ? like : null}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;