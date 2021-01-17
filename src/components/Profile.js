import React from 'react';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom';
import { useAuth } from "./../../firebase/auth";

export default function Profile() {   
        const { currentUser, updateEmail, updatePassword } = useAuth(); 
        console.log(currentUser.uid);
        // let currentUser = {};
        return (
            <div>
                {/* <p>Name: {props.name}</p>
                <p>Username: {props.username}</p>
                <Link to='/user/123/changePassword'>Change Password</Link> */}
                <p>Profile</p>
            </div>
        );
};