import React from 'react';
import { useState} from 'react';
import {  useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [creds, setcreds] = useState({email:'',password:''})
    let history=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:creds.email,password:creds.password})
          });
          const json= await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token',json.authToken);
            history('/');
            props.showAlert('Logged In Successfully!','success')
          }else{
            props.showAlert('Invalid Credentials!','danger')
          }
    }

    const onChange=(e)=>{
        setcreds({...creds,[e.target.name]:e.target.value})
    
    }
    return (
        <div className='container my-3'>
            <h2 className='mb-5'>Login to Continue to AayuCloud...</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" value={creds.email} id="email" name='email' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={creds.password} id="password" name='password' onChange={onChange}/>
                </div>
                <button type="submit"  className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login