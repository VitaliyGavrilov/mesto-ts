import React, { useEffect, useState, FC, useContext } from 'react';
import User from '../types/typeCurrentUser';

interface ProfileProps {
  profileData: User 
  openPopupEditProfile: () => void
  openPopupEditAvatar: () => void
  openPopupAddcard: () => void
}

const Profile:FC<ProfileProps> = ({profileData, openPopupEditProfile, openPopupEditAvatar, openPopupAddcard}) => {

  return(
    <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-block">
            <img className="profile__avatar" src={profileData.avatar} alt="Аватар" aria-label="Открыть попап редактирования аватара" />
            <button type="button" className="profile__edit-avatar" onClick={openPopupEditAvatar}/>
          </div>
          <div className="profile__card">
            <div className="profile__no-wrap">
              <h1 className="profile__name">{profileData.name}</h1>
              <button className="profile__edit-button" type="button" aria-label="Кнопка редактирования профиля" onClick={openPopupEditProfile} />
            </div>
            <p className="profile__profession">{profileData.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" aria-label="Кнопка добавления фотографии" onClick={openPopupAddcard} />
      </section>
  )  

}

export default Profile