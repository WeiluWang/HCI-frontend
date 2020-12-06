import React, {useEffect} from 'react';
import SubmitButton from '../component/submitButton';
import UserStore from '../stores/UserStore';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import {Route, Switch, Link, BrowserRouter as Router} from "react-router-dom";
import {Button, Row, Col} from 'react-bootstrap';
import { useState } from "react";
import "./profile.css";

function Profile() {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [age, setAge] = useState(0);
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('')
    const [user, setUser] = useState(UserStore.username);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [email, setEmail] = useState('');
    const updateProfile = () => {
        if(buttonDisabled) {
            setButtonDisabled(false);
            return;
        }
        console.log("UserStore.id : " + UserStore.id);
        axios.put('http://cs6543.herokuapp.com:80/users/user/'+UserStore.id,
            {
                "username": UserStore.username,
                
                "age": age? age:0,
                "email" : email,
                "phone":phone? phone: UserStore.phone,
                "location": location?location: UserStore.location
            },
            
        ).then(function(response2) {
            console.log(response2);
            alert('update profile success!');
        }).catch(function (error) {
            console.log(error);
        })
        setButtonDisabled(true);
    }
    
    

    return (
        <div className='profile'>
             
                    <div className='hi'>
                        Welcome to UHelp {UserStore.username} !
                    </div>
                    <Row>
                        <Col xs={6}>
                            <div className='profileInput'>
                                <label className='profileTitle' htmlFor="firstnameInput">Email</label>
                                <div>
                                    <input 
                                        className="input"
                                        id="FirstNameInput" 
                                        type='text'
                                        value={UserStore.email}
                                        
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='profileInput'>
                        <label className='profileTitle' htmlFor="emailInput">Role</label>
                        <div>
                            {UserStore.gender == 1 ? <div>Poster</div>:<div>Deliver</div>}
                        </div>
                    </div>
                    
                        </Col>
                        <Col xs={6}>
                        <div className='profileInput'>
                        <label className='profileTitle' htmlFor="ageInput">Age</label>
                        <div>
                            <input 
                                className="input"
                                id="ageInput" 
                                type='text'
                                value={UserStore.age}
                                onChange={(e) => setAge(e.target.value)}
                                
                            />
                        </div>
                    </div>
                    <div className='profileInput'>
                        <label className='profileTitle' htmlFor="emailInput">Gender</label>
                        <div>
                            {UserStore.gender == 1 ? <div>Male</div>:<div>Female</div>}
                        </div>
                    </div>
                        </Col>
                    </Row>
                    
                    
                    <div className='profileInput'>
                        <label className='profileTitle' htmlFor="emailInput">Phone</label>
                        <div>
                            <input 
                                className="input"
                                id="emailInput" 
                                type='text'
                                value={UserStore.phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className='profileInput'>
                        <label className='profileTitle' htmlFor="emailInput">Location</label>
                        <div>
                            <input 
                                className="input"
                                id="emailInput" 
                                type='text'
                                value={UserStore.location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className='balance'>
                            <div>
                                Balance: 146(USD)
                            </div>
                    </div>
                    

           
            <Row>
                <Col xs={6}>
                    <div className=''>
                        <Button
                            variant='outline-success'
                            className='saveBtn'
                            text='update'
                            onClick={() => updateProfile()}
                        >
                            {buttonDisabled ? "Update" : "Confirm"}
                        </Button>
                    </div>
                  

                </Col>
                <Col xs={6}>
                <Link to="/mainpage/record" ><Button variant='outline-info' >My tasks</Button></Link>
                </Col>
                
                
              
              </Row>
        </div>
    );

}

export default Profile;
