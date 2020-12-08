import React from 'react';
import SubmitButton from '../component/submitButton';
import UserStore from '../stores/UserStore';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import {Route, Switch, Link, BrowserRouter as Router} from "react-router-dom";
import {Button, Card, ListGroup, ListGroupItem, Modal, Row, Col, InputGroup,FormControl} from 'react-bootstrap';
import { useState, useEffect } from "react";
import CommentList from '../comment/comment';
import "./record.css";
import { lib } from 'crypto-js';

function RecordList() {
   
    const [tasks, setTasks] = useState([])
    const getPost = () => {
        UserStore.getDataFromSessionStorage();
        
        axios.get('http://cs6543.herokuapp.com:80/posts/user/'+UserStore.id,
            
        )
        .then(function (response) {
            //console.log(response);
            response.data = response.data.sort((a,b)=>{return a.createtime - b.createtime}).reverse();
            setTasks(response.data)
            console.log(tasks)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    
    useEffect(() => {getPost()}, []);
    const[detail,setDetail] = useState('')
    const showDetail = (e) => {
        setDetail(e.target.id)
        console.log(detail)
        
    }

    return (
        <div className="taskList">
            {
                tasks.map(t=>
                <div className={t.status==3?'recordDoneCard':'recordDoingCard'} onClick={showDetail} id={t.pid}>
                    <Row>
                        <Col xs={6}>
                    <div className='post-list-title' id={t.pid} onClick={showDetail}>{t.topic}</div>
                    </Col>
                    <Col xs={6}>
                    <div className='pay' id={t.pid} onClick={showDetail}>${t.price}</div>
                    </Col>
                    </Row>
                <div  id={t.pid} onClick={showDetail}>created on {t.dueTime.slice(0,10)}</div>
                {t.pid == detail && 
                <div id={t.pid}>
                    <Row id={t.pid}>
                        <Col xs={6} id={t.pid}>
                            <div className='detailTilte' id={t.pid}>Task description</div>
                            <div className='detailInfo' id={t.pid}>{t.description}</div>
                        </Col>
                        <Col xs={6} id={t.pid}>
                            <div className='detailTilte' id={t.pid}>Location</div>
                            <div className='detailInfo' id={t.pid}>{t.location}</div>
                        </Col>
                        
                    </Row>
                    {UserStore.role == 1 &&
                    <div className='feedback'>
                        
                    <textarea className='feedbackInput' placeholder='leave your feedback!'></textarea>
                    <div>
                        <Button variant='success'>Submit</Button>
                    </div>
                </div>
                    }
                    
                    
                    
                    
                </div>}
                </div>
                
                )
            }
        </div>
    );

}

export default RecordList;
