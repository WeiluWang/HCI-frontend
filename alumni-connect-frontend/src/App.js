import React, {useEffect,useState} from 'react';
import { observer } from 'mobx-react';
import UserStore from './stores/UserStore';
import LoginForm from './login/loginForm';
import RegisterForm from './register/register';
import {Route, Switch, Link, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import MainPage from './mainpage/mainpage';
import {Button, Row, Col} from 'react-bootstrap'


function App() {

 const[show,setShow] = useState(false)

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
            
            <Switch>
              <Route exact path = "/">
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
          
            {UserStore.isLoggedIn==false && 
              <div className='navLink'>                  
                  <Link  to="/"  ><Button className='navLinkBtnLogin' variant="outline-primary">Login</Button></Link>
                  <Link  to="/register" ><Button className='navLinkBtnRegister' variant="outline-primary">
                    Register
                  </Button></Link>
                
              </div>}
          </Router>
          
        
        
      </div>
    );
  }

}

export default observer(App);
