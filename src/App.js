import React from 'react'
import Feed from './Components/Feed';
import Header from './Components/Header';
import SignIn from './Components/SignIn';
import Modal from './Components/Modal'
import './firebase/Firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true}>
          <Header/>
          <SignIn/>
        </Route>
        <Route path='/home'>
          <Header/>
          <Feed/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
