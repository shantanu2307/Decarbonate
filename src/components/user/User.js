import React from 'react';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom';
import Profile from './Profile'
import PassChange from './PassChange'

export default function User(props) {    
        return (
            <Router>
                <Route path='/user/changePassword' exact component={PassChange} />
                <Route path='/user' component={Profile} />
                
            </Router>
        )
    
};