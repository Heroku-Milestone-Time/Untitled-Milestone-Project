import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Pages/Home';
import Account from './components/Pages/Account';
import Project from './components/Pages/Project';
import Team from './components/Pages/Team';
import SignUp from './components/Pages/signup_component';
import Login from './components/Pages/login_registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useEffect, useState} from 'react';
import CurrentUserProvider from './context/CurrentUser.js'
// import 'bootstrap/dist/css/bootstrap.min.css';
 

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/message')
    .then((res) => res.json())
    .then((data) => {
      setData(data.message)
    })
  }, [])
  
  return (
    <CurrentUserProvider>
    <div className="App">
        <Router>
          <NavBar />
          <div className="pages">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route path="/account" element={<Login />} />
              <Route path="/project" element={<Project />} />
              <Route path="/team" element={<Team />} />
              <Route path='/sign-up' element={<SignUp />} />
            </Routes>
          </div>
        </Router>
    </div>
    </CurrentUserProvider>
  );
}

export default App;

