import React, { useContext, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

//import Calendar from './event/pages/Calendar';
import GlobalContext from './context/GlobalContext';
import EventModal from './event/components/EventModal';
//import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
//import './styleom.css';
import './style.css';
const Auth = React.lazy(() => import('./user/pages/Auth'));
const Calendar = React.lazy(() => import('./event/pages/Calendar'));

function App() {
  // console.log(`Appjs lefut?`);
  //Nagy naptárt állítja, Modelt állítja
  const { showEventModal } = useContext(GlobalContext);
  //ide kell a token még
  const { login, logout, userId, token } = useAuth();

  // let token = false;
  let routes;

  /* FOR THE REAL USING HERE YOU MUST WRITE "token" IN IF STATEMENT
  IF YOU WANT SEE THE AUTH PAGE WRITE "false" IN TEST MODE
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
    /*   console.log(`window.innerWidth: ${window.innerWidth}`)
   console.log(`window.innerHeight: ${window.innerHeight}`)*/
    let size = window.innerHeight / 12;
    let modalsize = size / 3;
    /* console.log(`size azaz a --screen (innerHeight/12): ${size}`)
   console.log(`modalsize azaz a --modal (size/3): ${size}`)*/
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
//Calendaron belül kell main és aside!!!!!!!!!!!!!!!!!!!!!!!!!!
