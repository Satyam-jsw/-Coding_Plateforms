import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

let Forgetpage=()=>{
    let {token}=useParams();
    // console.log(token);
    let [email,uemail]=useState('');
    let [password,upassword]=useState('');
   let fun=async (val)=>{
       val.preventDefault();
       let val1={email:email,password:password};
      //  console.log(val1);
       let res=await fetch(`/forgetpassword/${token}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(val1)
       });
       let data=await res.json();
       window.alert(data.message);
   }

    return (
       <>
        <div className='login'>
    <form method="POST">

  <div className="form-outline mb-4">
    <input type="email" id="form2Example1" className="form-control" value={email} onChange={(e)=>{uemail(e.target.value)}}/>
    <label className="form-label" >Email address</label>
  </div>

  
  <div className="form-outline mb-4">
    <input type="password" id="form2Example2" autoComplete='password' className="form-control" value={password} onChange={(e)=>{upassword(e.target.value)}} />
    <label className="form-label" >New Password</label>
  </div>
  <button onClick={fun} type="submit" className="btn btn-primary btn-block mb-4">Click</button>
  </form>
  </div>
  </>
    )
};

export default Forgetpage;