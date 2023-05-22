import React, { useContext } from 'react';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
  // Accessing the authentication context
  const auth = useContext(AuthContext);
  return (
    <React.Fragment>
      {/* Link to the main page */}
      <div className="nav-links back-main-page-link-grid">
        <a href="https://smbutordesign.hu/"> VISSZA FŐOLDAL</a>
      </div>

      {/* Conditional rendering based on user authentication */}
      {auth.isLoggedIn && (
        <div className="nav-links logout-link-grid">
          <button onClick={auth.logout}>KIJELENTKEZÉS</button>
        </div>
      )}
    </React.Fragment>
  );
};

export default NavLinks;
