import React, {Component, useState} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import DailyEm from './DailyEm';
import MonthlyEm from './MonthlyEm';
import PictureEm from './PictureEm';
import './../../css/emission.css'

export default function Emission() {
    return (
        <Router>
            <div className='emission'>
                <div className='tabs'>
                    <Link to='/emission/daily'><button className='button'>Daily</button></Link>
                    <Link to='/emission/monthly'><button className='button'>Monthly</button></Link>
                    <Link to='/emission/picture'><button className='button'>Picture</button></Link>
                </div>

                <Route path='/emission/daily' component={DailyEm} />
                <Route path='/emission/monthly' component={MonthlyEm} />
                <Route path='/emission/picture' component={PictureEm} />
            </div>
        </Router>
    )
};