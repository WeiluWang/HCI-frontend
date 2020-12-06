import React from 'react';
import InputField from '../component/inputField';
import SubmitButton from '../component/submitButton';
import UserStore from '../stores/UserStore';
import axios from 'axios';
import { useState } from "react";
import './register.css'
import {Button, Row, Col} from 'react-bootstrap'
import {useHistory} from "react-router-dom";
import CryptoJs from 'crypto-js';

function RegisterForm() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState(0);
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState(0);
    const [location, setLocation] = useState('');
    const [genderBtn, setGenderBtn] = useState(0);
    const [roleBtn, setRoleBtn] = useState(0);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    let history = useHistory();

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setEmail('');
        setButtonDisabled(false);
    }

    const handleGenderMaleBtn = () => {
        setGender(1)
        setGenderBtn(1)
    }
    const handleGenderFemaleBtn = () => {
        setGender(2)
        setGenderBtn(2)
    }

    const handlePosterBtn = () => {
        setRole(1)
        setRoleBtn(1)
    }
    const handleDeliverBtn = () => {
        setGender(2)
        setRoleBtn(2)
    }


    const doRegister = async () => {

        if (!username) {
            return;
        }
        if(!password) {
            return;
        }

        setButtonDisabled(true);

        try {
            const apiUrl = 'http://cs6543.herokuapp.com:80/signUp';
            
            let res = await axios.post(apiUrl, {
                username: username,
                password  : password,
                email   : email,
                location:location,
                age:age,
                gender:gender,
                role:role,
                balance:100,
                phone:phone
            }).catch(error=>{
                alert(error.response.data.message);
            });
            if (res.status === 200) {
                console.log(res)
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
                console.log(UserStore)
                history.push("/mainpage")
                
            } else {
                resetForm();
                // if(res.status === 400 && res.data.message == "Usernmae already exists.")
                alert(res.data.message);
            }
        } catch(e) {
            resetForm();
            console.log(e);
        }

    }

    return (
        <div className="registerForm">
            <div className='title'>
                Resigter
            </div>
            <Row>
                <Col xs={6}>
            <div className='inputTool'>
                <label htmlFor="usernameInput">Username</label>
                <div>
                <input 
                    className='input'
                    id="usernameInput" 
                    type='text'
                    plcaeholder='Username'
                    value={username ? username : ''}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </div>
            </div>
            <div className='inputTool'>
                <label htmlFor="emailInput">Phone</label>
                <div>
                <input 
                    className='input' 
                    id="emailInput" 
                    type='text'
                    plcaeholder='Email'
                    value={phone ? phone: ''}
                    onChange={(e) => setPhone(e.target.value)}
                />
                </div>
            </div>


            <div className='inputTool'>
                <label htmlFor="emailInput">Email</label>
                <div>
                <input 
                    className='input' 
                    id="emailInput" 
                    type='text'
                    plcaeholder='Email'
                    value={email ? email: ''}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
            </div>
            
            </Col>
            <Col xs={6}>
            <div  className='inputTool'>
                <label htmlFor="passwordInput">Password</label>
                <div>
                <input
                    className='input' 
                    id="passwordInput" 
                    type='password'
                    plcaeholder='Password'
                    value={password ? password : ''}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
            </div>
            <div className='inputTool'>
                <label htmlFor="emailInput">Location</label>
                <div>
                <input 
                    className='input' 
                    id="emailInput" 
                    type='text'
                    plcaeholder='Email'
                    value={location ? location: ''}
                    onChange={(e) => setLocation(e.target.value)}
                />
                </div>
            </div>
            <div className='inputTool'>
                <label htmlFor="emailInput">Age</label>
                <div>
                <input 
                    className='input' 
                    id="emailInput" 
                    type='text'
                    plcaeholder='Age'
                    value={age ? age: ''}
                    onChange={(e) => setAge(e.target.value)}
                />
                </div>
            </div>
            
            
            
            </Col>
            </Row>
            <div className='inputTool'>
                <label htmlFor="emailInput">Role</label>
                <div>
                <Button variant={roleBtn==1?'primary':'outline-primary'} onClick={handlePosterBtn}> Poster</Button>
                <Button variant={roleBtn==2?'primary':'outline-primary'} onClick={handleDeliverBtn}> Deliver</Button>
                </div>
            </div>
            <div className='inputTool'>
                <label htmlFor="emailInput">Gender</label>
                <div>
                <Button variant={genderBtn==1?'primary':'outline-primary'} onClick={handleGenderMaleBtn}> Male</Button>
                <Button variant={genderBtn==2?'primary':'outline-primary'} onClick={handleGenderFemaleBtn}> Female</Button>
                </div>
            </div>
           
            <div className='submitBtn'>
            <Button
                variant='outline-success'
                className='submitButn'
                disabled={buttonDisabled}
                onClick={ () => doRegister() }
            >
                Register
            </Button>
            </div>
            <div hidden role="alert">{UserStore.username}</div>
        </div>
    );

}

export default RegisterForm;
