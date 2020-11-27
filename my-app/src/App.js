import React, {useEffect} from 'react';
import { observer } from 'mobx-react';
import UserStore from './user/UserStore';
import LoginForm from './login/loginForm';
import RegisterForm from './register/register';
import {Route, Switch, Link, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import MainPage from './mainpage/mainpage';
import { runInAction } from 'mobx';

function App() {

 

  const checkSecssion = () => {
    UserStore.getDataFromSessionStorage();
    console.log("render App");
  }


  useEffect(() => {checkSecssion()}, []);

  if (UserStore.loading) {
    return (
      <div className="app">
        
          Loading, please wait...
      
      </div>
    );
  } else {

    return (
       <div className="app">
          <Router>
            <div className='account'>
            {UserStore.isLoggedIn===false && 
              <div className='navLink'>
                <Link className='navLinkBtn' to="/login">Login</Link>
                <Link className='navLinkBtn' to="/register">Register</Link>
              </div>}
            <Switch>
              <Route exact path = "/login">
                <LoginForm />
              </Route>
              <Route exact path = "/register">
                <RegisterForm />
              </Route>
              <Route path = "/mainpage">
                <MainPage />
              </Route>
            </Switch>
            </div>
          </Router>

        
        
      </div>
    );
  }

}

export default observer(App);
