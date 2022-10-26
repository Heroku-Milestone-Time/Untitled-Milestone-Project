import React, { Component } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  let navigate = useNavigate();
  let [usersData, setUsersData] = useState({ fname: "", lname: "", email: "", password: "" })
  // const [fname, setFName] = useState("")
  // const [lname, setlName] = useState("")
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  async function handleSubmit(e) {
    e.preventDefault()
    
    const response = await fetch(`http://localhost:4000/users/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usersData)

    })
    // const parsedResponse= await response.json()
    // console.log(parsedResponse)

    let path = '/account';
    navigate(path);
  }

  async function newRoute() {
    navigate('/account');
  }

  // handleClose()}

  // let handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // const { fname, lname, email, password } =  state;
  //   console.log("test; ",fname, lname, email, password);
  //   axios.post('/users/sign-up', {fname, lname, email, password})
  // .then(r => {
  // console.log("RESPONSE:")
  // })
  // let res = await fetch('http://localhost:4000/sign-up', {
  //   method: 'POST',
  //   // crossDomain: true,
  //   // headers: {
  //   //   'Content-Type': 'application/json',
  //   //   Accept: 'application/json',
  //   //   'Access-Control-Allow-Origin': '*',
  //   // },
  //   body: JSON.stringify({
  //     fname:fname,
  //     email:email,
  //     lname:lname,
  //     password:password
  //   }),
  // })
  // .then((res) => res.json())
  // .then((data) => {
  // console.log(data, 'userRegister');
  // });

  // render() {
  return (
    <div class="signup">
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <div>
        <label>First Name:</label>
        <br/>
        <input
          // value= {fname}
          type='text'
          className='form-control'
          placeholder='First name'
          // onChange={(e) =>  setFName( e.target.value )}
          onChange={e => setUsersData({ ...usersData, 'fname': e.target.value },)}
        />
      </div>
      <br/>
      <div>
        <label>Last Name:</label>
        <br/>
        <input
          // value= {lname}
          type='text'
          className='form-control'
          placeholder='Last name'
          // onChange={(e) =>  setlName( e.target.value )}
          onChange={e => setUsersData({ ...usersData, 'lname': e.target.value },)}
        />
      </div>
      <br/>
      <div>
        <label>Email Address:</label>
        <br/>
        <input
          // value= {email}
          type='email'
          className='form-control'
          placeholder='Enter email'
          // onChange={(e) =>  setEmail( e.target.value )}
          onChange={e => setUsersData({ ...usersData, 'email': e.target.value },)}
        />
      </div>
      <br/>
      <div>
        <label>Password:</label>
        <br/>
        <input
          // value= {password}
          type='password'
          className='form-control'
          placeholder='Enter password'
          // onChange={(e) =>  setPassword( e.target.value )}
          onChange={e => setUsersData({ ...usersData, 'password': e.target.value },)}
        />
      </div>
      <br/>
      <div class="button-box">
        <button type="submit" className='btn btn-primary submit-btn'>
          Sign Up
        </button>
      </div>

      <p>
        Already registered? <span onClick={newRoute}><b>Click here to sign in!</b></span>
      </p>
    </form>
    </div>
  );
}
