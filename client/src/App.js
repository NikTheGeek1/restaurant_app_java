import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';

function App() {

  

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
          {/* <RestaurantCanvas  tableData={[
      { available: Math.random() > 0.5 },
      { available: Math.random() > 0.5 },
      { available: Math.random() > 0.5 },
      { available: Math.random() > 0.5 },
      { available: Math.random() > 0.5 },
      { available: Math.random() > 0.5 },
      { available: Math.random() > 0.5 },
      { available: Math.random() > 0.5 }
    ]}/> */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
