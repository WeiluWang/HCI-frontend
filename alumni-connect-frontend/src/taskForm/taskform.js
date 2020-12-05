import React, {useEffect} from 'react';
import SubmitButton from '../component/submitButton';
import UserStore from '../stores/UserStore';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import {Route, Switch, Link, BrowserRouter as Router} from "react-router-dom";
import {Button, Row, Col, ProgressBar} from 'react-bootstrap';
import { useState } from "react";
import "./taskform.css";

function TaskForm() {
    //countdown
    const [countdownover, setCountdoenover] = useState(false)
    const [over, setOver] = React.useState(false);
    const CountDown = ({ hours = 0, minutes = 0, seconds = 0 }) => {
        const [paused, setPaused] = React.useState(false);
        
        const [[h, m, s], setTime] = React.useState([hours, minutes, seconds]);
      
        const tick = () => {
          if (paused || over) return;
          if (h === 0 && m === 0 && s === 0){
               setOver(true);
               
          }
          else if (m === 0 && s === 0) {
            setTime([h - 1, 59, 59]);
          } else if (s == 0) {
            setTime([h, m - 1, 59]);
          } else {
            setTime([h, m, s - 1]);
          }
        };
      
        const reset = () => {
          setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
          setPaused(false);
          setOver(false);
        };
      
        React.useEffect(() => {
          const timerID = setInterval(() => tick(), 1000);
          return () => clearInterval(timerID);
        });
        
        return (
          <div>
            <p>{`${h.toString().padStart(2, '0')}:${m
              .toString()
              .padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</p>
            
            {over&&
            <Button variant='outline-danger' onClick={handleCancel}> Cancel order</Button>}
          </div>
        );
      };

    
      const handleCancel = () =>{
        axios.put('http://cs6543.herokuapp.com:80/posts/post/'+curpid,
            {
                "status":4
            }
        )
        .then(function(response){
            setCurTask(false)
        })
        .catch(function (error) {
            console.log(error);
        })
      }

    const [curTask, setCurTask] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    //for current task
    const [curpid,setCurpid] = useState(0)
    const [deliverPhone,setDeliverPhone] = useState('')
    const [deliver,setDeliver] = useState(0)
    const [deliverName,setDeliverName] = useState("")
    const [curTopic,setCurTopic] = useState("")
    const [curDescription,setCurDescription] = useState("")
    const [curPrice,setCurPrice] = useState(0)
    const [createTime,setCreateTime] = useState("")
    const [duetime,setDueTime] = useState("")
    const [status,setStatus] = useState(0)

    const getUserPost = () => {
        UserStore.getDataFromSessionStorage();
        
        axios.get('http://cs6543.herokuapp.com:80/posts/user/'+UserStore.id,
            
        )
        .then(function (response) {
            console.log(response);
            let res = response.data.filter(d => d.status!=3 && d.status!=4)
            console.log("testtttt")
            console.log(res)
            if(res.length>0){
                setCurTask(true)
                setCurpid(res[0].pid)
                setDeliverPhone(res[0].deliverPhone)
                setDeliver(res[0].deliver)
                setDeliverName(res[0].deliverName)
                setCurTopic(res[0].topic)
                setCurDescription(res[0].description)
                setCurPrice(res[0].price)
                setCreateTime(res[0].createTime)
                setDueTime(res[0].dueTime)
                setStatus(res[0].status)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    useEffect(() => {getUserPost()}, []);
    const handlePost = ()=>{
        axios.post('http://cs6543.herokuapp.com:80/posts/post/',
            {
                "topic":title,
                "description":description,
                "price":price,
                "deliver":0,
                "poster":UserStore.id,
                "status":0,
                "location":UserStore.location
            }
        )
        .then(function (response) {
            console.log(response)
            setCurTask(true)
        })
        .catch(function (error) {
            console.log(error);
        })

    }
    return (
        <div className='profile'>
            {curTask? 
            <div>
                {status==2 ?
                <div>
                    <div className="tasktitle">Delivering...</div>
                    <div className="curTask">
                    
                    </div>
                    <div className='deliverInfo'>
                        <div>Deliver Name:</div>
                        <div className='info'>{deliverName}</div>
                        <div>Phone Number:</div>
                        <div className="info"> {deliverPhone}</div>
                    </div>
                    
                </div>:
                <div>
                    <div className="tasktitle">Waiting for Deliver...</div>
                    <div className="curTask">
                    <CountDown hours={0} minutes={1} />
                    </div>
                </div>
                }
                
                
                
            </div>
            :
            <div>
                    <div className='profileInput'>
                        <label className='profileTitle' htmlFor="usernameInput">Tilte</label>
                        <div>
                            <input 
                                className="input"
                                
                                type='text'
                                value={title ? title : ''}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                  
                    <div className='profileInput'>
                        <label className='profileTitle' htmlFor="usernameInput">desciprtion</label>
                        <div>
                            <input 
                                className="input"
                                
                                type='text'
                                value={description ? description : ''}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='profileInput'>
                        <label className='profileTitle' htmlFor="usernameInput">Pay</label>
                        <div>
                            <input 
                                className="input"
                                
                                type='text'
                                value={price ? price : 0}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='submitBtn'>
                    <Button
                        variant='outline-success'
                        className='submitButn'
                        onClick={handlePost}
                    
                    >
                        Post
                    </Button>
                    </div>
                    </div>
                    }
                    
        </div>
    );

}

export default TaskForm;
