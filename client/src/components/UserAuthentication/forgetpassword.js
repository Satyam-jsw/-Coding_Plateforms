import React, { useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';


let Forget = () => {
  let [email, setEmail] = useState('');
  let fun = async (event) => {
    event.preventDefault();

    let res = await fetch('https://coding-platform-bitcode.onrender.com/sendmail', {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ email: email }),
    })
    let data = await res.json();

    window.alert(data.messageToUser);
  }
  return (
    <>
      <div className='login'>
        <form method="POST">

          <div className="form-outline mb-4">
            <label className="form-label" >Email address:</label>

            <input type="email" id="form2Example1" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <button onClick={fun} type="submit" className="btn btn-primary btn-block mb-4">Send</button>

        </form>
      </div>
    </>

  )

}

export default Forget;