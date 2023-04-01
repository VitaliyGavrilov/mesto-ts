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

// Основной компонент, который собирает приложение
const App: FC = () => {
  // Cтейт-переменные:
  const [currentUser, setCurrentUser] = useState<User>({name: '', about: '' , avatar: ''}); // Данные-текущие данные пользователя
  const [selectedCard, setSelectedCard] = useState<CardEl>({_id: 0, name: '', link: '', likes: []}); //данные-Передача данных при увеличении изображения и удалении карточки
  const [cards, setCards] = useState<CardEl[]>([]);// Данные-данные карточек
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState<boolean>(false); // попап-Редактирование профиля
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState<boolean>(false); // попап-Редактирование аватара
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState<boolean>(false); // попап-Добавление карточки
  const [isImagePopupOpen, setIsImagePopupOpen] = useState<boolean>(false); // попап-Увеличение изображения
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState<boolean>(false); // попап-Удаление карточки 
  // ---Запрос на получение данных пользователя и карточек 
  useEffect(() => { 
    Promise.all([api.getUserInfo(), api.getInitialCards()]) 
      .then(([userInfo, initialCards]) => { 
        setCurrentUser(userInfo); 
        setCards(initialCards); 
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
    // setDeleteCard({ card })
    setSelectedCard(card)
  }
  // -Обработчик удаления карточки
  function handleCardDelete(card: CardEl) {
    api.deleteCard(card._id)
      .then(() => { setCards((cardsArray) => cardsArray.filter((cardItem) => cardItem._id !== card._id)); closeAllPopups() })
      .catch((err) => { console.log(`Возникла ошибка при удалении карточки, ${err}`) })
  }

  // --Функция для закрытия всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsImagePopupOpen(false);
  }
  // Сборка приложения 
  return(
    <div className="page">
      <Header/>
      <Main
        openPopupEditProfile = {handleEditProfileClick}
        openPopupEditAvatar = {handleEditAvatarClick}
        openPopupAddcard = {handleAddPlaceClick}
        openPopupImg={handleCardClick}
        openPopupDeleteCard={handleDeleteCardClick}
        userData = {currentUser}
        dataCards = {cards}
      />
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
    </div>
  )
}
export default App