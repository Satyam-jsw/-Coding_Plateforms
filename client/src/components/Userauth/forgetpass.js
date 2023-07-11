import React, { useState } from "react";
// import './css/home.css';
import 'bootstrap/dist/css/bootstrap.css';
let Forget=()=>{
       let [email,uemail]=useState('');
       let fun=async(val)=>{
          val.preventDefault();
          console.log(email);
          let res=await fetch('/sendmail',{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Access-Control-Allow-Origin':'*'
            },
            body:JSON.stringify({email:email}),
          })
          let data=await res.json();
          
          window.alert(data.message);
       }
    return(
   <>
    <div className='login'>
    <form method="POST">

  <div className="form-outline mb-4">
  <label className="form-label" >Email address:</label>

    <input type="email" id="form2Example1" className="form-control" value={email} onChange={(e)=>{uemail(e.target.value)}}/>
  </div>
  <button onClick={fun} type="submit" className="btn btn-primary btn-block mb-4">Send</button>

</form>
</div>
</>
       
        )
    
}

export default Forget;