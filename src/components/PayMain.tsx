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
      
      <section className="order">

        <div className="order__card">
          <h2 className='order__title'>Покупатель</h2>
          <img className="order__avatar" src={dataUser.avatar} alt="Аватар" />
          <h3 className="order__name">{dataUser.name}</h3>
          <p className="order__profession">{dataUser.about}</p>
        </div>
        <div className="order__card">
          <h2 className='order__title'>Товар</h2>
          <img className="order__avatar" src={dataCard.link} alt="Аватар" />
          <h3 className="order__name">{dataCard.name}</h3>
          <p className="order__price">{`${dataCard.likes.length > 0 ? dataCard.likes.length * 10 : 10} $`}</p>
        </div>
        <div className="order__card">
          <h2 className='order__title'>Продавец</h2>
          <img className="order__avatar" src={dataCard.owner.avatar} alt="Аватар" />
          <h3 className="order__name">{dataCard.owner.name}</h3>
          <p className="order__profession">{dataCard.owner.about}</p>
        </div>

      </section>

      <section className='payment'>
        <div className='payment__card'>
          <form>
            <fieldset className='payment__fieldset'>
              <input type="text" pattern='[0-9]{16}' placeholder="Номер карты"/>
              <input type='text' placeholder="Имя владельца"/>
              <input type='month'placeholder="Меясц/год"/>
              <input type='text'placeholder="CVV" maxLength={maxLengthCVV} minLength={minLengthCVV}/>
            </fieldset>
            <button>Оплатить</button>
          </form>
        </div>
      </section>
      
    </main>
  )
}
export default PayMain