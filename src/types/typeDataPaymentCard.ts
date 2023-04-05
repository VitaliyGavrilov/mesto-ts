
type PaymentCard = {
  number: string//номер карточки
  name: string//имя владельца карточки
  date: string//дата
  CVV: string//CVV
}

export default interface Payment {
  PaymentCard: PaymentCard //карта оплаты
  date: Date//дата платежа
  prise: string//цена
  seller: string//продавец
}