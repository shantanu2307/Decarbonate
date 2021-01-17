import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { AuthProvider } from "./firebase/auth";
import Landing from './components/Landing';
import Signup from './components/Signup';
import User from './components/user/User';
import Navbar from './components/Navbar';
import Emission from './components/emissions/Emission';
import Login from './components/login';
import PrivateRoute from "./firebase/PrivateRoute"
import './css/style.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='app'>

        <AuthProvider>    
          <Switch> 
           <Route exact path='/' component={Landing} />
           <Route path='/signup' component={Signup} />
           <Route path='/emission' component={Emission} />
           <PrivateRoute path = '/user' component={User} />
           <Route path='/login' component={Login}/>
           </Switch>
        </AuthProvider>

        
      </div>
    </Router>
  );
}

export default App;
