import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/logo_transparent.png'
import { useAuth } from './../firebase/auth';

export default function Navbar() {  

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = useAuth();



    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{fontSize:'18px'}}>
                <Link to='/' className='navbar-brand'><img src={logo} alt='Logo' width={'200'}/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        {!isLoggedIn && <li className="nav-item"><Link to='/user/daily' className='nav-link'>Profile</Link></li>}
                        <li className="nav-item"><Link to='/emission/daily' className='nav-link'>Emission</Link></li>
                        {!isLoggedIn && <li className='nav-item'><Link to='/logout' className='nav-link'>Logout</Link></li>}
                        {!isLoggedIn && <li className="nav-item"><Link to='/signup' className='nav-link'>Signup</Link></li>}
                        {!isLoggedIn && <li className="nav-item"><Link to='/login' className='nav-link'>Login</Link></li>}
                    </ul>
                </div>
            </nav>
        </div>
    )

};
