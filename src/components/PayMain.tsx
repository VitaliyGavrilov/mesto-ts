import React, { useEffect, useState, FC, useContext } from 'react';
import CardEl from '../types/typeCard';
import User from '../types/typeCurrentUser';
import api from '../utils/api.js';
import Card from './Card';
import Profile from './Profile';
import {Link, useNavigate} from 'react-router-dom'
import Payment from '../types/typeDataPaymentCard';

interface PayMainProps {
  dataCard: CardEl
  dataUser: User
  submit: (order: Payment) => void
  isSelectedProduct: boolean

}

const PayMain: FC<PayMainProps> = ({dataCard, dataUser, submit, isSelectedProduct}) => {
  const maxLengthCVV: number = 3
  const minLengthCVV: number = 3

  // Стейт-переменные
  const [nameCard, setNameCard] = useState<string>('');
  const [numberCard, setNumberCard] = useState<string>('');
  const [dateCard, setDateCard] = useState<string>('');
  const [cvvrCard, setCvvCard] = useState<string>('');

  const price: string = `${dataCard.likes.length > 0 ? dataCard.likes.length * 10 : 10}$`;
  let dateTime = new Date();

  const navigate = useNavigate();
  
  // Обработчик сабмита
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate('/history');
    submit({
      PaymentCard: {number: numberCard, name: nameCard, date: dateCard, CVV: cvvrCard},
      date: dateTime,
      prise: price,
      seller:`${dataCard.owner.name}, ${dataCard.owner.about}`
    });
  }
  // Считываем данные импутов
  function handleCardName(event: React.ChangeEvent<HTMLInputElement>) { 
    
    setNameCard(event.target.value.toUpperCase()) 
  }
  function handleNumberCard(event: React.ChangeEvent<HTMLInputElement>) { setNumberCard(event.target.value) }
  function handleDateCard(event: React.ChangeEvent<HTMLInputElement>) { setDateCard(event.target.value) }
  function handleCvvCard(event: React.ChangeEvent<HTMLInputElement>) { setCvvCard(event.target.value) }


  return(
    
    <main className="content">
    { isSelectedProduct ?
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
          <p className="order__price">{price}</p>
        </div>
        <div className="order__card">
          <h2 className='order__title'>Продавец</h2>
          <img className="order__avatar" src={dataCard.owner.avatar} alt="Аватар" />
          <h3 className="order__name">{dataCard.owner.name}</h3>
          <p className="order__profession">{dataCard.owner.about}</p>
        </div>

      </section>
    :<h1 className='no-product'>Выберите Товар</h1>}
      {isSelectedProduct &&
      <section className='payment'>
        <div className='payment__card'>
          <form onSubmit={handleSubmit}>
            <fieldset className='payment__fieldset'>
              <input type="text" pattern='[0-9]{16}' placeholder="Номер карты" onChange={handleNumberCard}/>
              <input type='text' placeholder="Имя владельца" onChange={handleCardName}/>
              <input type='month'placeholder="Меясц/год" onChange={handleDateCard}/>
              <input type='text'placeholder="CVV" maxLength={maxLengthCVV} minLength={minLengthCVV} onChange={handleCvvCard}/>
            </fieldset>
            <button type='submit'>{`Оплатить ${price}`}</button>
          </form>
        </div>
      </section>}
    

      
    </main>
    
  )
}
export default PayMain