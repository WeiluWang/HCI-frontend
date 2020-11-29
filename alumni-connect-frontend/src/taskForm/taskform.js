import React, {useEffect} from 'react';
import SubmitButton from '../component/submitButton';
import UserStore from '../stores/UserStore';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import {Route, Switch, Link, BrowserRouter as Router} from "react-router-dom";
import {Button, Row, Col} from 'react-bootstrap';
import { useState } from "react";
import "./taskform.css";

function TaskForm() {
    const [curTask, setCurTask] = useState(true)
    return (
        <div className='profile'>
             
                    <div className='profileInput'>
                        <label className='profileTitle' htmlFor="usernameInput">Username</label>
                        <div>
                            <input 
                                className="input"
                                id="usernameInput" 
                                type='text'
                                value={UserStore.username}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='profileInput'>
                        <label className='profileTitle' htmlFor="usernameInput">Tilte</label>
                        <div>
                            <input 
                                className="input"
                                
                                type='text'
                                value=""
                               
                            />
                        </div>
                    </div>
                    <div className='profileInput'>
                        <label className='profileTitle' htmlFor="usernameInput">Location</label>
                        <div>
                            <input 
                                className="input"
                                
                                type='text'
                                value=""
                               
                            />
                        </div>
                    </div>
                    <div className='profileInput'>
                        <label className='profileTitle' htmlFor="usernameInput">desciprtion</label>
                        <div>
                            <input 
                                className="input"
                                
                                type='text'
                                value=""
                               
                            />
                        </div>
                    </div>
                    <div className='profileInput'>
                        <label className='profileTitle' htmlFor="usernameInput">Pay</label>
                        <div>
                            <input 
                                className="input"
                                
                                type='text'
                                value=""
                               
                            />
                        </div>
                    </div>
        </div>
    );

}

export default TaskForm;
