import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

//component represents a side drawer that slides in from the left side of the screen.
const SideDrawer = (props) => {
  // Content of the side drawer
  /*CSSTransition component from the react-transition-group library
   is used to apply animation classes to the side drawer.
   . */
  const content = (
    <CSSTransition
      /*The in prop controls whether the side drawer is 
    shown or hidden based on the value of props.show */
      in={props.show}
      //prop specifies the duration of the animation.
      timeout={200}
      classNames="slide-in-left"
      //specifies that the component should be mounted when it enters the DOM.
      mountOnEnter
      //specifies that the component should be unmounted when it exits the DOM.
      unmountOnExit
    >
      {/*Inside the CSSTransition component, there is an aside
       element representing the side drawer. It has a CSS class
        name of side-drawer and a click event handler 
        (props.onClick) that is triggered when the side drawer is clicked */}
      <aside className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );
  // Render the side drawer using ReactDOM.createPortal
  // and attach it to the 'drawer-hook' element in the DOM
  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
