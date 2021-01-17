import React, {useState, useEffect} from 'react';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom';
import { useAuth } from "./../../firebase/auth";
import axios from 'axios';

export default function Profile() {   

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    
    const { currentUser, updateEmail, updatePassword } = useAuth(); 
    
    if (currentUser) {
        let uid = currentUser.uid;
        axios.post('http://localhost:8080/user/get', {uid: uid})
            .then(response => {
                console.log(response.data);
                setEmail(currentUser.email);
                setUsername(response.data.username);
                setLocation(response.data.location);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>Email: {email}</p>
            <p>Username: {username}</p>
            <p>Location: {location}</p>
        </div>
    );
};