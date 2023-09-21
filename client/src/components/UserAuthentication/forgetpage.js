import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

let Forgetpage = () => {
  let { token } = useParams();

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  let fun = async (event) => {
    event.preventDefault();

    let newPassword = { email: email, password: password };
    

    let response = await fetch(`https://coding-platform-bitcode.onrender.com/forgetpassword/${token}`, {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newPassword)
    });

    let data = await response.json();
    window.alert(data.messageToUser);
  }

  return (
    <>
      <div className='login'>
        <form method="POST">

          <div className="form-outline mb-4">
            <input type="email" id="form2Example1" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <label className="form-label" >Email address</label>
          </div>


          <div className="form-outline mb-4">
            <input type="password" id="form2Example2" autoComplete='password' className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <label className="form-label" >New Password</label>
          </div>
          <button onClick={fun} type="submit" className="btn btn-primary btn-block mb-4">Click</button>
        </form>
      </div>
    </>
  )
};

export default Forgetpage;