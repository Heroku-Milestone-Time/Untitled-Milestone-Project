import React, { Component } from 'react';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state ={
            fname: '',
            lname: '',
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const { fname, lname, email, password } = this.state;
        console.log(fname, lname, email, password);
        fetch('http:localhost:3000/register', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                fname,
                email,
                lname,
                password,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, 'userRegister');
        });
    }
    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className='mb-3'>
                    <label>First name</label>
                    <input 
                        type='text'
                        className='form-control'
                        placeholder='First name'
                        onChange={(e) => this.setState({ fname: e.target.value })}
                    />
                </div>
            </form>
        )
    }
}