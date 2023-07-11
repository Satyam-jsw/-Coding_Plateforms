import React, {  useContext, useEffect,useState } from 'react';
// import './css/home.css';
import 'bootstrap/dist/css/bootstrap.css';

import {NavLink,useNavigate} from 'react-router-dom';
// import { UserContext } from '../App';
const Login = () => {
  // const {state,dispatch}=useContext(UserContext);
  const navigate=useNavigate();
   let [email,uemail]=useState('');
   let [password,upassword]=useState('');
   let fun=(val)=>{
    val.preventDefault();
    let data={email,password};
    fetch("/login",{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
         'Access-Control-Allow-Origin':'*'
      },
      body:JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then(data=>{
     window.alert(data.message);
     if(data.status==200){
      // dispatch({type:"USER",payload:true});
      navigate('/');
     }
     else{
      navigate('/login');
     }
        })
    .catch((e)=>{
      window.alert(data.message);
      navigate('/login');
      uemail('');
      upassword('');
      console.log(e)
    })
   
   }


  return (
    <>
    <div className='login' >
    <form method="POST" >

  <div className="form-outline mb-4">
    <input type="email" id="form2Example1" className="form-control" value={email} onChange={(e)=>{uemail(e.target.value)}}/>
    <label className="form-label" >Email address</label>
  </div>

  
  <div className="form-outline mb-4">
    <input type="password" id="form2Example2" autoComplete='password' className="form-control" value={password} onChange={(e)=>{upassword(e.target.value)}} />
    <label className="form-label" >Password</label>
  </div>

 
  <div className="row mb-4">
    <div className="col d-flex justify-content-center">
      {/* <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked={false} />
        <label className="form-check-label" > Remember me </label>
      </div> */}
    </div>

    <div className="col">
    
      <NavLink to="/forgetpass">Forgot password?</NavLink>
    </div>
  </div>

 
  <button onClick={fun} type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

 
  <div className="text-center">
    <p>Not registered member<NavLink to="/register">Register</NavLink></p>
    <p>or sign up with:</p>
    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-facebook-f"></i>
    </button>

  </div>
</form>
</div>
</>
  )
}


export default Login;