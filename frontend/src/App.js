import React, { useContext, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import GlobalContext from './context/GlobalContext';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

import EventModal from './event/components/EventModal';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

import './style.css';
const Auth = React.lazy(() => import('./user/pages/Auth'));
const Calendar = React.lazy(() => import('./event/pages/Calendar'));

function App() {
  //It sets a big calendar, it sets a Model
  const { showEventModal } = useContext(GlobalContext);
  //still need the token here
  const { login, logout, userId, token } = useAuth();

  let routes;

  /* FOR THE REAL USING HERE YOU MUST WRITE "token"*/
  /*IN IF STATEMENT IF YOU WANT SEE THE AUTH PAGE WRITE "false" IN TEST MODE
  IF YOU WANT SEE THE CALENDAR PAGE WRITE "false" IN TEST MODE
  */

  if (true) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Calendar />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        {/*<Redirect to="/auth" />*/}
        <Redirect to="/" />
      </Switch>
    );
  }

  useEffect(() => {
    let size = window.innerHeight / 12;
    let modalsize = size / 3;
    let r = document.querySelector(':root');
    r.style.setProperty('--screen', `${size}px`);
    r.style.setProperty('--modal', `${modalsize}px`);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <div id="content-grid">
          <MainNavigation />
          {showEventModal && <EventModal />}

          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner></LoadingSpinner>
              </div>
            }
          >
            {routes}
          </Suspense>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
