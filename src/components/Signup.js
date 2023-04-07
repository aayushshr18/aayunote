import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = (props) => {

  const [creds, setcreds] = useState({name:'',email:'',password:''})
    let history=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:creds.name,email:creds.email,password:creds.password})
          });
          const json= await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token',json.authtoken);
            history('/');
            props.showAlert('Account created successfully!','success')
          }else{
            props.showAlert('Invalid Credentials!','danger')
          }
    }

  const onChange=(e)=>{
    setcreds({...creds,[e.target.name]:e.target.value})

}
  return (
    <div className='container my-3'>
            <h2 className='mb-5'>Sign Up Now for uninterrupted use of AayuCloud!</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" required minLength={3} value={creds.name} className="form-control"  id="name" name='name' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" required value={creds.email} className="form-control" id="email" name='email' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={creds.password} required minLength={5} className="form-control" id="password" name='password' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" required minLength={5} className="form-control" id="cpassword" name='cpassword' onChange={onChange}/>
                </div>
                <button type="submit"  className="btn btn-primary">Sign Up</button>
            </form>
        </div>
  )
}

export default Signup