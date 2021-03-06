import React from 'react';
import UserStore from '../stores/UserStore';
import axios from 'axios';
import { useState } from "react";
import {useHistory} from "react-router-dom";
import { runInAction } from 'mobx';
import './login.css'
import {Button} from 'react-bootstrap'
import CryptoJs from 'crypto-js';

function LoginForm() {

    let history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setButtonDisabled(false);
    }
    
    const doLogin =  async() => {
       
        if (!username) {
            return;
        }
        if(!password) {
            return;
        }

        setButtonDisabled(true);

        try {
            const apiUrl = 'http://cs6543.herokuapp.com:80/logIn';
            
            let res = await axios.post(apiUrl, {
                "username": username,
                "password": password,
            });
            //console.log(res)
            runInAction(() => {
                if (res.status === 200) {
                    UserStore.isLoggedIn = true;
                    UserStore.username = username;
                    UserStore.age = res.data.age;
                    UserStore.location = res.data.location;
                    UserStore.gender = res.data.gender;
                    UserStore.phone = res.data.phone;
                    UserStore.id = res.data.uid;
                    UserStore.email = res.data.email;
                    UserStore.role = res.data.role;
                    UserStore.setDataFromSessionStorage();
                    setUsername('success');
                    // console.log(username);
                    history.push("/mainpage");
                } else {
                    resetForm();
                    alert("Wrong Username Or Password.");
                }
            })

        } catch(e) {
            resetForm();
            alert("Wrong Username Or Password.");
            console.log(e);
        }

    }

    return (
        <div className="loginForm">
            <div className='title'>
                Log In
            </div>
            <div className='inputTool'>
                <label htmlFor="usernameInput">Username</label>
                <div>
                    <input 
                        className="input"
                        id="usernameInput" 
                        type='text'
                        plcaeholder='Username'
                        value={username ? username : ''}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>

            <div className='inputTool'>
                <label htmlFor="passwordInput">Password</label>
                <div>
                    <input 
                        className="input"
                        id="passwordInput" 
                        type='password'
                        plcaeholder='Password'
                        value={password ? password : ''}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className='submitBtn'>
                <Button
                    variant='outline-success'
                    className='submitButn'
                    text='Login'
                    disabled={buttonDisabled}
                    onClick={ () => doLogin() }
                >
                    Login
                </Button>
            </div>

            <div hidden role="alert">{UserStore.username}</div>

            {/* {username === 'success' ? <div hidden role="alert">alert</div> : null} */}
        </div>
    
    );

}

export default LoginForm;
