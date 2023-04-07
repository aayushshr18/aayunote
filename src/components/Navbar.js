import React from 'react'
import { Link, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export const Navbar = (props) => {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    props.showAlert('Logged Out Successfully!','success')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-primary bg-dark navbar-dark">
      <div className="container-fluid bg-dark">
        <a className="navbar-brand" href="/">AayuCloud</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} href="/about">About</a>
            </li>
          </ul>
          {!localStorage.getItem('token') ? <form className="d-flex" role="search">
            <a className="btn btn-outline-success mx-2" role='button' href='/login'>Login</a>
            <a className="btn btn-outline-success mx-2" role='button' href='/signup'>SignUp</a>
          </form> : <form className="d-flex bg-dark" role="search">
         <div className="nav-item dropdown text-white mx-5">
          <i className="nav-link dropdown-toggle bg-dark fa fa-regular fa-user mx-5"  role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
          <ul className="dropdown-menu">
            <li><button type="submit" onClick={handleLogout} className="btn btn-outline-success mx-2">Logout</button></li>
          </ul>
          </div></form>
        }
      </div>
    </div>
</nav >
  )
}
