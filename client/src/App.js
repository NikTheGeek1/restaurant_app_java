import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import { isCookie, getCookie, USER_LOGGED_IN, ADMIN_LOGGED_IN } from './local-storage-utils/cookies-utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { logUserIn } from './store/actions/user-details';
import RestaurantCanvas from './components/RestaurantCanvas/RestaurantCanvas';

function App() {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(state => state.userDetails.isLoggedIn);
  const adminLoggedIn = useSelector(state => state.adminDetails.isLoggedIn);

  useEffect(() => {
    // retrieve cookie if stored
    if (isCookie(USER_LOGGED_IN)) {
      const costumer = getCookie(USER_LOGGED_IN);
      // dispatch(logUserIn(costumer));
    }
    if (isCookie(ADMIN_LOGGED_IN)) {
      const admin = getCookie(ADMIN_LOGGED_IN);
      // dispatch(logAdminIn(admin));
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {!userLoggedIn && !adminLoggedIn ? <LandingPage /> :
            <RestaurantCanvas tableData={[
              { available: Math.random() > 0.5 },
              { available: Math.random() > 0.5 },
              { available: Math.random() > 0.5 },
              { available: Math.random() > 0.5 },
              { available: Math.random() > 0.5 },
              { available: Math.random() > 0.5 },
              { available: Math.random() > 0.5 },
              { available: Math.random() > 0.5 }
            ]} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
