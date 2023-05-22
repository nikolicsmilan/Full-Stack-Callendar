import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

import './MainNavigation.css';

const MainNavigation = (props) => {
  // State to manage whether the side drawer is open or closed
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  // Handler to open the side drawer
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  // Handler to close the side drawer
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  /*The NavLinks component is rendered twice, once inside the side drawer and once inside the main header, to display the navigation links. */
  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      {/*MainHeader contains the main header of the navigation. It includes the button to open the side drawer, the title, and additional navigation links. */}
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="title-grid">
          <h1 className="main-navigation__title fontsize-18">
            <Link to="/">
              <span className="black">S</span>&
              <span className="black ">M </span>
              BÚTORDESIGN KFT. NAPTÁR
            </Link>
          </h1>
        </div>

        <div className="links-grid">
          <nav className="middle-grid-for-nav">
            <NavLinks />
          </nav>
        </div>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
