import React, { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import plusImg from '../../assets/plus.png';
import './CreateEventButton.css';

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => {
        setShowEventModal(true);
      }}
      className="create-event-button"
    >
      <div className="create-event-button-frame">
        <img
          className="create-event-button-image"
          src={plusImg}
          alt="plus sign"
        />
        <p className="create-event-button-text">Create</p>
      </div>
    </button>
  );
}
