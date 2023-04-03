import React, { useEffect, useState, FC, useContext } from 'react';
import CardEl from '../types/typeCard';
import User from '../types/typeCurrentUser';
import api from '../utils/api.js';
import Card from './Card';
import Profile from './Profile';
import {Link, useNavigate} from 'react-router-dom'

interface PayMainProps {
  dataCard: CardEl
  dataUser: User

}

const PayMain: FC<PayMainProps> = ({dataCard, dataUser}) => {
  return(
    <main className="content">

      <menu>
        <h1>Страница оплаты</h1>
        <Link to='/'>перейти</Link>
      </menu>
      <h2>Покупатель</h2>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-block">
            <img className="profile__avatar" src={dataUser.avatar} alt="Аватар" />
          </div>
          <div className="profile__card">
            <h1 className="profile__name">{dataUser.name}</h1>
            <p className="profile__profession">{dataUser.about}</p>
          </div>
        </div>
      </section>

      <h2>Товар</h2>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-block">
            <img className="profile__avatar" src={dataCard.link} alt="Аватар" />
          </div>
          <div className="profile__card">
            <p>{dataCard.name}</p>
            <h1 className="profile__name">{`Продавец: ${dataCard.owner.name},${dataCard.owner.about} `}</h1>
            <p className="profile__profession">{`Цена: ${dataCard.likes.length > 0 ? dataCard.likes.length * 10 : 10} $`}</p>
          </div>
        </div>
      </section>

  

      <section>
        <h2>Карточка для оплаты</h2>
        <div>
          <h3>Данные карты оплаты</h3>
          <div>
            <form>
              <fieldset>
                <input type=''/>
                <input/>
                <input/>
              </fieldset>
              <button/>
            </form>
          </div>
        </div>
      </section>
      
    </main>
  )
}
export default PayMain