import React, { FC, useEffect, useRef, useState } from 'react';
import CardEl from '../types/typeCard';

interface ImagePopupProps {
  isOpen: boolean
  onClose: () => void
  data: CardEl
}

const ImagePopup: FC<ImagePopupProps> = ({isOpen, onClose, data}) => {
  const clikOverlay = (e: any) => {
    if(e.target.classList.contains('popup')) {
      onClose()
    }
  }
  return (
    <div className={`popup popup-img ${isOpen && 'popup_opened'}`} onClick={clikOverlay}>
      <div className="popup__img-container">
        <img className="popup__img" src={data.link} alt={data.name} />
        <figcaption className="popup__figcaption">{data.name}</figcaption>
        <button className="popup__close-button" type="button" onClick={onClose} ></button>
      </div>
    </div>
  )
}
export default ImagePopup;