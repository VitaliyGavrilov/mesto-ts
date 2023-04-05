// Импорты
import React, {FC, useState, useEffect} from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import api from '../utils/api.js';
import PopupEditProfile from './PopupEditProfile';
import CardEl from '../types/typeCard';
import User from '../types/typeCurrentUser';
import PopupEditAvatar from './PopupEditAvatar';
import PopupAddCard from './PopupAddCard';
import ImagePopup from './PopupImage';
import PopupDeleteCard from './PopupDeleteCard';
import PopupBuyCard from './PopupBuyCard';
import {Route, Routes, Link} from 'react-router-dom'
import PayMain from './PayMain';
import PaymentCard from '../types/typeDataPaymentCard';
import Payment from '../types/typeDataPaymentCard';
import HistoryMain from './HistoryMain';
// Основной компонент, который собирает приложение
const App: FC = () => {
  // Cтейт-переменные:
  const [isSelectedProduct, setIsSelectedProduct] = useState<boolean>(false);
  // const [paymentCard, setPaymentCard] = useState<PaymentCard[]>([]); // Данные-карты оплаты
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([])// данные-история платежей
  const [currentUser, setCurrentUser] = useState<User>({name: '', about: '' , avatar: '', _id: ''}); // Данные-текущие данные пользователя
  const [selectedCard, setSelectedCard] = useState<CardEl>({_id: 0, name: '', link: '', likes: [{_id: ''}], owner: {_id:'', name: '', about: '', avatar: ''}}); //данные-Передача данных при увеличении изображения, удалении карточки и покупке карточки
  const [cards, setCards] = useState<CardEl[]>([]);// Данные-данные карточек
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState<boolean>(false); // попап-Редактирование профиля
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState<boolean>(false); // попап-Редактирование аватара
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState<boolean>(false); // попап-Добавление карточки
  const [isImagePopupOpen, setIsImagePopupOpen] = useState<boolean>(false); // попап-Увеличение изображения
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState<boolean>(false); // попап-Удаление карточки 
  const [isBuyCardPopupOpen, setIsBuyCardPopupOpen] = useState<boolean>(false); // попап-Покупка карточки 
  // ---Запрос на получение данных пользователя и карточек 
  useEffect(() => { 
    Promise.all([api.getUserInfo(), api.getInitialCards()]) 
      .then(([userInfo, initialCards]) => { 
        setCurrentUser(userInfo); 
        setCards(initialCards); 
        console.log(initialCards)
      }) 
      .catch((err) => { console.log(`Возникла ошибка при загрузке данных, ${err}`) }) 
  }, [])
  // ---Функции:
  // --ПОПАП-Редактирование имени и проффесии
  // -Обработчик открытия попапа редактирования профиля
  function handleEditProfileClick() { setIsEditProfilePopupOpen(true) }
  // -Обработчик сабмита данных пользователя
  function handleUpdateUser(userItem: User) {
    api.patchUserInfo(userItem.name, userItem.about)
      .then((res) => { setCurrentUser(res); closeAllPopups() })
      .catch((err) => { console.log(`Возникла ошибка при редактировании профиля, ${err}`) })
  }
  // --ПОПАП-Редактирование аватара
  // -Обработчик открытия попапа обновления аватара
  function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true) }
  // -Обработчик сабмита аватара
  function handleUpdateAvatar(userItem: User) {
    api.patchUserAvatar(userItem.avatar)
      .then((res) => { setCurrentUser(res); closeAllPopups() })
      .catch((err) => { console.log(`Возникла ошибка при зименении аватара, ${err}`) })
  }
  // --ПОПАП-Добавление карточек
  // -Обработчик открытия попапа добавления карточки
  function handleAddPlaceClick() { setIsAddPlacePopupOpen(true) }
  // -Обработчик сабмита добавления карточки
  function handleAddCard(name: string, link: string) {
    api.postCard({ name: name, link: link })
      .then((card) => { setCards([card, ...cards]); closeAllPopups() })
      .catch((err) => { console.log(`Возникла ошибка при добавлении новой карточки, ${err}`) })
  }
  // --ПОПАП-Фото
  // -Обработчик открытия попапа фото
  function handleCardClick(cardItem: CardEl) {
    setIsImagePopupOpen(true);
    setSelectedCard(cardItem)
  }
  // --ПОПАП-Удаление карточек
  // -Обработчик открытия попапа удаления карточки
  function handleDeleteCardClick(card: CardEl) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard(card)
  }
  // -Обработчик удаления карточки
  function handleCardDelete(card: CardEl) {
    api.deleteCard(card._id)
      .then(() => { setCards((cardsArray) => cardsArray.filter((cardItem) => cardItem._id !== card._id)); closeAllPopups() })
      .catch((err) => { console.log(`Возникла ошибка при удалении карточки, ${err}`) })
  }
  // --ПОПАП-Покупки карточки
  // -Обработчик открытия попапа покупки
  function handleBuyCardClick(card: CardEl) {
    setIsBuyCardPopupOpen(true);
    setSelectedCard(card)
  }
  // --Функция для закрытия всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsBuyCardPopupOpen(false);
  }
  // --Лайки
  // -Обработчик лайка
  function handleCardLike(card: CardEl) {
    // -Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // -Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => { console.log(`Возникла ошибка при лайке, ${err}`) })
  }

  // --Оплата
  // -Обработчик оплаты карточки
  function handlePayCard (order: Payment) {
    setPaymentHistory([...paymentHistory ,order]);
    setIsSelectedProduct(false)
    console.log(paymentHistory);
  }


  // Сборка приложения 
  return(
    <div className="page">
      <Header/>
      <menu className='menu'>
        <Link className='menu_link' to='/'>Карточки</Link>
        <Link className='menu_link' to='/about'>Оплата</Link>
        <Link className='menu_link' to='/history'>История</Link>
      </menu>

      <Routes>
        <Route path='/' 
          element={
            <Main
              openPopupEditProfile = {handleEditProfileClick}
              openPopupEditAvatar = {handleEditAvatarClick}
              openPopupAddcard = {handleAddPlaceClick}
              openPopupImg={handleCardClick}
              openPopupDeleteCard={handleDeleteCardClick}
              openPopupBuyCard={handleBuyCardClick}
              likeClick={handleCardLike}
              userData = {currentUser}
              dataCards = {cards}
              
            />
         }>
        </Route>
        <Route path='/about' 
          element={
            <PayMain
              dataCard = {selectedCard}
              dataUser= {currentUser} 
              submit={handlePayCard}
              isSelectedProduct={isSelectedProduct}
            />
          }>
        </Route>
        <Route path='/history' 
          element={
            <HistoryMain
              orders={paymentHistory}
            />
          }>
        </Route>
      </Routes>
      
      <Footer/>
      <PopupEditProfile
        isOpen = {isEditProfilePopupOpen}
        onClose ={closeAllPopups}
        submit = {handleUpdateUser}
        userData = {currentUser}
      />
      <PopupEditAvatar
        isOpen = {isEditAvatarPopupOpen}
        onClose ={closeAllPopups}
        submit = {handleUpdateAvatar}
        userData = {currentUser}
      />
      <PopupAddCard
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        submit = {handleAddCard}
      />
      <ImagePopup
        isOpen = {isImagePopupOpen}
        onClose = {closeAllPopups}
        data = {selectedCard}
      />
      <PopupDeleteCard
        isOpen = {isDeleteCardPopupOpen}
        onClose ={closeAllPopups}
        submit = {handleCardDelete}
        data = {selectedCard}
      />
      <PopupBuyCard
        isOpen = {isBuyCardPopupOpen}
        onClose ={closeAllPopups}
        data = {selectedCard}
        selectedProduct = {setIsSelectedProduct}
      />
    </div>
  )
}
export default App