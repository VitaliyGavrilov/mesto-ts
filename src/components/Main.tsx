import React, { useEffect, useState, FC, useContext } from 'react';
import CardEl from '../types/typeCard';
import User from '../types/typeCurrentUser';
import api from '../utils/api.js';
import Card from './Card';
import Profile from './Profile';

interface MainProps {
  openPopupEditProfile: () => void
  openPopupEditAvatar: () => void
  openPopupAddcard: () => void
  openPopupImg: (card: CardEl) => void
  openPopupDeleteCard: (card: CardEl) => void
  userData: User
  dataCards: CardEl[]
}

const Main:FC<MainProps> = ({openPopupEditProfile, userData, dataCards, openPopupEditAvatar, openPopupAddcard, openPopupImg, openPopupDeleteCard}) => {

  return (
    <main className="content">
      <Profile
        profileData = {userData}
        openPopupEditProfile = {openPopupEditProfile}
        openPopupEditAvatar = {openPopupEditAvatar}
        openPopupAddcard = {openPopupAddcard}
      />
      <section className="element">
      { dataCards.map((cardItem) => (
        < Card
          key = { cardItem._id }
          link = { cardItem.link }
          name = { cardItem.name }
          like = { cardItem.likes.length }
          card = { cardItem } 
          openPopupImg = {openPopupImg}
          openPopupDeleteCard = {openPopupDeleteCard}
        />
        )) 
      }
      </section>

    </main>
  )
}
export default Main;