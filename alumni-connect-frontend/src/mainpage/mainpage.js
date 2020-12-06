import React from 'react';
import SubmitButton from '../component/submitButton';
import UserStore from '../stores/UserStore';
import {useHistory} from "react-router-dom";
import {Route, Switch, Link, BrowserRouter as Router} from "react-router-dom";
import Profile from '../profile/profile';
import PostList from '../post/post';
import {Button, Navbar, Nav,Form, Row, Col} from 'react-bootstrap'
import './mainpage.css'
import Personal from '../personal/personal';
import NYU from '../../src/nyu.png'
import RecordList from '../record/record';
import TaskForm from '../taskForm/taskform'


function MainPage() {
  console.log(UserStore.isLoggedIn)
    let history = useHistory();
    const doLogout = async() => {

      UserStore.username = '';
      UserStore.isLoggedIn = false;
      UserStore.loading = false;
      UserStore.setDataFromSessionStorage();
      history.replace("/");
      // history.goBack();
    }
    
    return (
        <div>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="/">UHelp</Navbar.Brand>
              <div className="logout">
                <Button 
                  className='logoutBtn'
                  disabled={false}
                  onClick={() => doLogout()}
                >Logout</Button>
              </div>
            </Navbar>
            <Router>
        
            <div className='tag'>
            
              <Row>
                <Col xs={5}>
                <Link to="/mainpage" ><Button variant='outline-info' className='linkBtnMP'>MainPage</Button></Link>
                  

                </Col>
                <Col xs={5}>
                <Link to="/mainpage/profile" ><Button variant='outline-info' className='linkBtnPf'>My Profile</Button></Link>
                </Col>
                
                
              
              </Row>
            <Switch>
              <Route path = "/mainpage/profile">
                <Profile />
              </Route>
              <Route exact path = "/mainpage">
                {UserStore.role==1?<TaskForm/>:<PostList />}
              </Route>
              <Route path = "/mainpage/record">
                <RecordList />
              </Route>
            </Switch>
            </div>
          </Router>
        </div>
    );

}

export default MainPage;
