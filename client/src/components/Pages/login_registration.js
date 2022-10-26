import React, { Component } from 'react';
import { useState, useContext } from 'react';
import { CurrentUser } from '../../context/CurrentUser';
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const { setCurrentUser } = useContext(CurrentUser)
  let [errorMessage, setErrorMessage] = useState(null)
  let [usersData, setUsersData] = useState({ email: "", password: "" })
  async function handleSubmit(e) {
    e.preventDefault();
    
    const response = await fetch(`http://localhost:4000/authentication/login-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usersData),

    });
    const parsedResponse = await response.json()
    

    if (response.status === 200) {
      setCurrentUser(parsedResponse.user)
      localStorage.setItem('token', parsedResponse.token)
    } else {
      setErrorMessage(parsedResponse.message)
    }

    let path = '/home';
    navigate(path);
  }

  async function newRoute() {
    navigate('/sign-up');
  }

  return (
    <div class="signin">
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>

      <div class="input-feature">
        <label>Email Address:</label>
        <br/>
        <input
          type='email'
          className='form-control'
          placeholder='Enter email'
          onChange={e => setUsersData({ ...usersData, 'email': e.target.value },)}
        />
      </div>

      <div class="input-feature">
        <label>Password:</label>
        <br/>
        <input
          type='password'
          className='form-control'
          placeholder='Enter password'
          onChange={e => setUsersData({ ...usersData, 'password': e.target.value },)}
        />
      </div>
      <br/>
      <div class="button-box">
        <button type='submit' className='btn btn-primary submit-btn'>
          Submit
        </button>
      </div>
      <br/>
      <p>
      Not yet registered? <span onClick={newRoute}><b>Click here to sign up!</b></span>
      </p>
    </form>
    </div>
  );
}
