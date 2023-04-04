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
  const maxLengthCVV: number = 3
  const minLengthCVV: number = 3
  return(
    <main className="content">

      

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
            <h1 className="profile__name">{dataCard.name}</h1>
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
                <input type="text" inputMode="numeric" placeholder="Номер карты"/>
                <input type='text' placeholder="Имя владельца"/>
                <input type='month'placeholder="Меясц/год"/>
                <input type='text'placeholder="CVV" maxLength={maxLengthCVV} minLength={minLengthCVV}/>
              </fieldset>
              <button>Оплатить</button>
            </form>
          </div>
        </div>
      </section>
      
    </main>
  )
}
export default PayMain