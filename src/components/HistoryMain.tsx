import React, { useEffect, useState, FC, useContext } from 'react';
import CardEl from '../types/typeCard';
import User from '../types/typeCurrentUser';
import api from '../utils/api.js';
import Card from './Card';
import Profile from './Profile';
import {Link, useNavigate} from 'react-router-dom'
import Payment from '../types/typeDataPaymentCard';

interface HistoryMainProps {
  orders:  Payment[]
}


const HistoryMain: FC<HistoryMainProps> = ({orders}) => {

  return(
    <main className="content">

      <section>

        <table className='table'>
          <thead>
            <tr>
              <th className='str'>Карта оплаты</th>
              <th className='str'>Получатель</th>
              <th className='str'>Сумма</th>
              <th className='str'>Дата</th>
            </tr>
          </thead>
          <tbody>
          {orders.map((order) => (
            <tr>
              <td className='str'>{`Номер: ${order.PaymentCard.number}, Владелец: ${order.PaymentCard.name}`}</td>
              <td className='str'>{order.seller}</td>
              <td className='str'>{order.prise}</td>
              <td className='str'>{order.date.toString()}</td>
            </tr>
          ))}
            
          </tbody>
        </table>

      </section>
      
    </main>
  )
}
export default HistoryMain;