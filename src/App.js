import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { AuthProvider } from "./firebase/auth";
import Landing from './components/Landing';
import Signup from './components/Signup';
import User from './components/user/User';
import Navbar from './components/Navbar';
import Emission from './components/emissions/Emission';
import Login from './components/login';
import Logout from './components/logout';
import Forum from './components/chats/Forum';
import PrivateRoute from "./firebase/PrivateRoute"
import './css/style.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className='app'>

        <AuthProvider>    
          <Switch> 
           <Route exact path='/' component={Landing} />
           <Route path='/logout' isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} component={Logout} />
           <Route path='/signup' isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} component={Signup} />
           <Route path='/emission' component={Emission} />
           <PrivateRoute path = '/user' component={User} />
           <PrivateRoute path = '/posts' component={Forum} />
           <Route path='/login' isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} component={Login}/>
           </Switch>
        </AuthProvider>

        
      </div>
    </Router>
  );
}

export default App;
