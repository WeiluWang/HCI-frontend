import React from 'react';
import SubmitButton from '../component/submitButton';
import UserStore from '../stores/UserStore';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import {Route, Switch, Link, BrowserRouter as Router} from "react-router-dom";
import {Button, Card, ListGroup, ListGroupItem, Modal, Row, Col, InputGroup,FormControl} from 'react-bootstrap';
import { useState, useEffect } from "react";
import CommentList from '../comment/comment';
import "./post.css";
import { lib } from 'crypto-js';

function PostList() {



    const [tasks, setTasks] = useState([])

   
    const[detail,setDetail] = useState('')
    const[postername, setPostername] = useState('');
    const[posterphone, setPosterphone] = useState('');
    const showDetail = (e) => {
        setDetail(e.target.id)
        console.log(detail)
        
    }
    useEffect(() => {
        axios.get('http://cs6543.herokuapp.com:80/posts/post/'+detail,
        )
        .then(function (response) {
            console.log(response);
            setPostername(response.data.postName)
            setPosterphone(response.data.postPhone)
            console.log(postername)
            console.log(posterphone)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [detail]);

    const getPost = () => {
        UserStore.getDataFromSessionStorage();
        
        axios.get('http://cs6543.herokuapp.com:80/deliver/getAllNotTakenPosts/',
            
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
    const [newTask, setNewTask] = useState(false)
    
    const recieveButton = () =>{
        axios.put('http://cs6543.herokuapp.com:80/posts/post/'+detail,
        {
            "deliver":UserStore.id,
            "status":1
        }
        )
        .then(function (response) {
            console.log(response);
            setNewTask(true)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    const[wait, setWait] = useState(false)
    const DoneButton = () =>{
        axios.put('http://cs6543.herokuapp.com:80/posts/post/'+detail,
        {
            "deliver":UserStore.id,
            "status":2
        }
        )
        .then(function (response) {
            console.log(response);
            setWait(true)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    
   


    return (
        <div>
        {newTask?
        <div>
            {wait?
            <div>
                <div className="deliveringtitle">Waiting Poster Confirm...</div>
                <div className="curTask"> 
                </div>
            </div>:
            <div>
            <div className="deliveringtitle">Finishing Your Task...</div>
            <div className="curTask"> 
            </div>
            <Button variant="outline-success" className="confirmBtn" onClick={DoneButton}>Done</Button>
            </div>
            }
            
        </div>:
        <div className="taskList">
            {
                tasks.map(t=>
                <div className='postCard' onClick={showDetail} id={t.pid}>
                    <Row>
                        <Col xs={6}>
                    <div className='post-list-title' id={t.pid} onClick={showDetail}>{t.topic}</div>
                    </Col>
                    <Col xs={6}>
                    <div className='pay' id={t.pid} onClick={showDetail}>${t.price}</div>
                    </Col>
                    </Row>
                <div  id={t.pid} onClick={showDetail}>closed at {t.dueTime.slice(11,16)}</div>
                {t.pid == detail && 
                <div id={t.pid}>
                    <Row id={t.pid}>
                        <Col xs={6} id={t.pid}>
                            <div className='detailTilte' id={t.pid}>Task description</div>
                            <div className='detailInfo' id={t.pid}>{t.description}</div>
                            <div className='detailTilte' id={t.pid}>Contact</div>
                            <div className='detailInfo' id={t.pid}>{postername}</div>
                            <div className='detailInfo' id={t.pid}>{posterphone}</div>
                        </Col>
                        <Col xs={6} id={t.pid}>
                            <div className='detailTilte' id={t.pid}>Location</div>
                            <div className='detailInfo' id={t.pid}>{t.location}</div>
                            
                        </Col>
                        
                        <Button variant='outline-primary' className='recieveBtn' id={t.pid} onClick={recieveButton}>recieve</Button>
                        
                    </Row>
                </div>}
                </div>
                
                )
            }
        </div>
        }
        </div>
    );

}

export default PostList;
