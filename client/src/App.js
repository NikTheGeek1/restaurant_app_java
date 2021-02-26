import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import { isCookie, getCookie, USER_LOGGED_IN, ADMIN_LOGGED_IN, removeCookie } from './local-storage-utils/cookies-utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { logUserIn } from './store/actions/user-details';
import { logAdminIn } from './store/actions/admin-details';
import { herokuWarmUpFetch } from './services/heroku-server-warm-up';
import StatsDashboard from './components/StatsDashboard/StatsDashboard';
import HerokuFallback from './components/HerokuFallback/HerokuFallback';
import AdminInterface from './components/AdminInterface/AdminInterface';
import CustomerInterface from './components/CustomerInterface/CustomerInterface';

function App() {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(state => state.userDetails.isLoggedIn);
  const [isHerokuReady, setIsHerokuReady] = useState(false);
  const adminLoggedIn = useSelector(state => state.adminDetails.isLoggedIn);

  useEffect(() => {
    herokuWarmUpFetch(() => setIsHerokuReady(true));
  }, []);

  useEffect(() => {
    // retrieve cookie if stored
    if (isCookie(USER_LOGGED_IN)) {
      const costumer = getCookie(USER_LOGGED_IN);
      dispatch(logUserIn(costumer));
    }
    if (isCookie(ADMIN_LOGGED_IN)) {
      const admin = getCookie(ADMIN_LOGGED_IN);
      dispatch(logAdminIn({ name: admin }));
    }
  }, []);

  let indexPageComponentJSX = <LandingPage />;
  if (userLoggedIn && adminLoggedIn) {
    removeCookie(USER_LOGGED_IN);
    removeCookie(ADMIN_LOGGED_IN);
  }
  if (userLoggedIn) {
    indexPageComponentJSX = <CustomerInterface />;
  }
  if (adminLoggedIn) {
    indexPageComponentJSX = <AdminInterface />;
  }

  return (
    <Router>
      { isHerokuReady ? (
        <Switch>
          <Route path="/" exact>
            {indexPageComponentJSX}
          </Route>

          {adminLoggedIn && <Route path="/admin-stats">
            <StatsDashboard />
          </Route>}
        </Switch>
      ) :
        <HerokuFallback />
      }
    </Router>
  );
}

export default App;
