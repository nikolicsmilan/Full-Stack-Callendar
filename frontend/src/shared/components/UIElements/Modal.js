import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';

const ModalOverlay = props => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      {/* Modal header */}
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : event => event.preventDefault()
        }
      >
        {/* Modal content */}
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        {/* Modal footer */}
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  
  // Render the modal overlay using ReactDOM.createPortal
  // and attach it to the 'modal-hook' element in the DOM
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => {
  return (
    <React.Fragment>
      {/* Render the backdrop when the modal is shown */}
      {props.show && <Backdrop onClick={props.onCancel} />}
      
      {/* Render the modal with CSS transition */}
      <CSSTransition
        in={props.show} // Show or hide the modal based on the 'show' prop
        mountOnEnter // Mount the component when it enters the DOM
        unmountOnExit // Unmount the component when it exits the DOM
        timeout={200} // Animation duration
        classNames="modal" // CSS class name for the animation
      >
        {/* Modal overlay component */}
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
//check commit
