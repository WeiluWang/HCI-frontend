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
    const task = [
        {
            title:"water444",
            description:"can someone buy water for me pls!!!",
            location:"2404 Shady Dr, Colorado Spring, CO, 90821",

        },
        {
            title:"water1",
            description:"can someone buy water for me pls!!!",
            location:"2404 Shady Dr, Colorado Spring, CO, 90821",

        },
        {
            title:"water2",
            description:"can someone buy water for me pls!!!",
            location:"2404 Shady Dr, Colorado Spring, CO, 90821",

        },
        {
            title:"water3",
            description:"can someone buy water for me pls!!!",
            location:"2404 Shady Dr, Colorado Spring, CO, 90821",

        },
        {
            title:"water4",
            description:"can someone buy water for me pls!!!",
            location:"2404 Shady Dr, Colorado Spring, CO, 90821",

        }

    ]


    
    const [post, setPost] = useState('');
    const [inputTopic, setInputTopic] = useState('');
    const [inputContent, setInputContent] = useState('');
    const [inputTag, setInputTag] = useState('');
    const [tagArray,setTagArray] = useState([]);
    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = ()=>{
        setShow(false);
    }
    const handleNewPost = () => {
        console.log(inputTag)
        console.log(inputTopic)
        axios.post('http://nyu-devops-alumniconnect.herokuapp.com/api/posts/user/'+UserStore.id, {
            user: UserStore.id,
            username: UserStore.username,
            title: inputTopic,
            content: inputContent,
            tags: tagArray
          },
          {headers: { Authorization: UserStore.token}}
          )
          .then(function (response) {
            console.log(response);
            axios.get('http://nyu-devops-alumniconnect.herokuapp.com/api/posts',
                )
                .then(function (response) {
                    //console.log(response);
                    response.data = response.data.sort((a,b)=>{return a.createtime - b.createtime}).reverse();
                    setPosts(response.data)
                    //console.log(posts)
                })
                .catch(function (error) {
                    console.log(error);
                })
          })
          .catch(function (error) {
            console.log(error);
          });
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const Search = () => {

    }

    const getPost = () => {
        UserStore.getDataFromSessionStorage();
        
        axios.get('http://nyu-devops-alumniconnect.herokuapp.com/api/posts',
            
        )
        .then(function (response) {
            //console.log(response);
            response.data = response.data.sort((a,b)=>{return a.createtime - b.createtime}).reverse();
            setPosts(response.data)
            //console.log(posts)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    
    useEffect(() => {getPost()}, []);
    const [postTitle, setPostTitle] = useState('');
    const [postUid, setPostUid] = useState('');
    const [postAuthor, setPostAuthor] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postTime, setPostTime] = useState('');
    const [postTags, setPostTags] = useState('');
    const[postActive, setPostActive] = useState('');
    const [postSearch, setPostSearch] = useState('');

    const handleTag=(e)=>{
        let res = e.target.value.split(" #")
        setTagArray(res)
    }

    const handleSearch=(e)=>{
        setPostSearch(e.target.value)
    }

    const deletePost=()=>{
        axios.delete('http://nyu-devops-alumniconnect.herokuapp.com/api/posts/post/'+ postActive,
            {headers: { Authorization: UserStore.token}}
        )
        .then(function (response) {
            //console.log(response);
            alert('post deleted')
            setPostActive('')
            axios.get('http://nyu-devops-alumniconnect.herokuapp.com/api/posts',
                )
                .then(function (response) {
                    //console.log(response);
                    response.data = response.data.sort((a,b)=>{return a.createtime - b.createtime}).reverse();
                    setPosts(response.data)
                    //console.log(posts)
                })
                .catch(function (error) {
                    console.log(error);
                })
            //console.log(posts)
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const handleAllPost=()=>{
        axios.get('http://nyu-devops-alumniconnect.herokuapp.com/api/posts',
        )
        .then(function (response) {
            //console.log(response);
            response.data = response.data.sort((a,b)=>{return a.createtime - b.createtime}).reverse();
            setPosts(response.data)
            //console.log(posts)
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const handleMyPost=()=>{
        let mypost = posts.filter(p=>p.user == UserStore.id)
        setPosts(mypost)
    }

    const handlePost=(e)=>{
        setPost(e.target.id)
        setPostActive(e.target.id)
        axios.get('http://nyu-devops-alumniconnect.herokuapp.com/api/posts/post/'+e.target.id,
        
        )
        .then(function (response) {
            console.log(response);
            setPostTitle(response.data.title)
            setPostAuthor(response.data.username)
            setPostUid(response.data.user)
            setPostContent(response.data.content)
            setPostTime(response.data.createtime)
            setPostTags(response.data.tags)
            console.log(postTags)
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    return (
        <div className="taskList">
            {
                task.map(t=>
                <div className='postCard'>
                    <div className='post-list-title'>{t.title}</div>
                    <div>
                        {t.description}
                    </div>
                    <div>
                        {t.location}
                    </div> 
                </div>
                
                )
            }
        </div>
    );

}

export default RecordList;
