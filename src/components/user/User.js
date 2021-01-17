import React from 'react';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom';
import Profile from '../Profile'
import PassChange from './PassChange'

export default function User(props) {    
        return (
            <Router>
                <Route path='/user' exact component={Profile} />
                <Route path='/user/changePassword' component={PassChange} />
            </Router>
        )
    
};