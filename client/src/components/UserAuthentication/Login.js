import React, { useContext, useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import '../Style/login.css'
import {Link, NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
 
  const navigate = useNavigate();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let fun = (val) => {
    val.preventDefault();
  
    let data = { email, password };

    fetch("https://coding-platform-bitcode.vercel.app/userlogin", {
      method: "POST",
      headers: 
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(data => {
        window.alert(data.messageToUser);

        if (data.status ==1) 
        {
          navigate('/');
          window.location.reload(true);
        }
        else 
        {
          navigate('/login');
          
        }
      })
      .catch((error) => {
        window.alert(data.messageToUser);
        navigate('/login');
        setEmail('');
        setPassword('');
        
      })
      
  }

  return (
    <>
     <div className="container ">
        <div className="d-flex justify-content-center align-center h-100">
            <div className="card">
                <div className="card-header">
                    <h3>Log In</h3>
                    {/* <div className="d-flex justify-content-end social_icon">
                        <span> <i className="fab fa-google-plus-square"></i> </span>
                        <span><i className="fab fa-facebook-square"></i></span>
                        <span><i className="fab fa-twitter-square"></i></span>
                    </div> */}
                </div>

                <div className="card-body">
                    <form action="POST">
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                   <i className="fas fa-envelope"></i> </span>
                            </div>
                            <input type="email" className="form-control" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"/>
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                   <i className="fas fa-key"></i> </span>
                            </div>
                            <input type="password" className="form-control" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"/>
                        </div>
                        <div className="row align-items-center remember">
                            <input type="checkbox" />Remember Me
                        </div>
                        <div className="form-group">
                            <input type="mail" onClick={fun}  value="Login" className="btn float-right login_btn"/>
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links ">
                        Don't have an account?
                        <Link to={"/register"}>Sign Up</Link>
                    </div>
                    <div className="d-flex justify-content-center links">
                     <Link to={"/forgetpage"}>Forgot your Password?</Link>
                        {/* <a href="#">Forgot your Password?</a> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}


export default Login;
