import React, { useEffect, useState, FC, useContext } from 'react';
import CardEl from '../types/typeCard';
import User from '../types/typeCurrentUser';
import api from '../utils/api.js';
import Card from './Card';
import Profile from './Profile';
import {Link, useNavigate} from 'react-router-dom'

// interface MainProps {
//   openPopupEditProfile: () => void
//   openPopupEditAvatar: () => void
//   openPopupAddcard: () => void
//   openPopupImg: (card: CardEl) => void
//   openPopupDeleteCard: (card: CardEl) => void
//   openPopupBuyCard: (card: CardEl) => void
//   userData: User
//   dataCards: CardEl[]
//   likeClick: (card: CardEl) => void
// }

// const Main:FC<MainProps> = ({openPopupEditProfile, openPopupBuyCard, userData, dataCards, openPopupEditAvatar, openPopupAddcard, openPopupImg, openPopupDeleteCard, likeClick}) => {

//   return (
//     <main className="content">
//       <Profile
//         profileData = {userData}
//         openPopupEditProfile = {openPopupEditProfile}
//         openPopupEditAvatar = {openPopupEditAvatar}
//         openPopupAddcard = {openPopupAddcard}
//       />
//       <section className="element">
//       { dataCards.map((cardItem) => (
//         < Card
//           profileData = {userData}
//           key = { cardItem._id }
//           card = { cardItem } 
//           openPopupImg = {openPopupImg}
//           openPopupDeleteCard = {openPopupDeleteCard}
//           openPopupBuyCard = {openPopupBuyCard}
//           likeClick = {likeClick}
//         />
//         )) 
//       }
//       </section>

//     </main>
//   )
// }
// export default Main;

const PayMain: FC = () => {
  return(
    <main className="content">
      <div>
        <a>Страница оплаты</a>
        <Link to='/'>перейти</Link>
      </div>
    </main>
    
    
  
    
  )
}
export default PayMain