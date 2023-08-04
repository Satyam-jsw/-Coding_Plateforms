import React from 'react';
// import './css/home.css';
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink,useNavigate} from 'react-router-dom';
const Register=()=>{
          const navigate=useNavigate();
          
          let [name,setName]=useState('');
         
          let [email,setEmail]=useState('');
          let [address,setAddress]=useState('');
          let [college,setCollege]=useState('');
          let [confirmPassword,setConfirmPassword]=useState('');
          let [password,setPassword]=useState('');
          let [remember,setRemember]=useState(false)
          const [file, setFile] = useState();

          let submitForm=async (val)=>{
            val.preventDefault();
            
            let data={name,email,password,confirmPassword,remember,address,college};
            console.log(data);

            const response=await fetch("/register",{
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
              body:JSON.stringify(data)
            });
           const result=await response.json();
           if(response.status===400)
           {
            window.alert(result.messageToUser);
            
           }
           else
           {
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setAddress('');
            setCollege('');
            setRemember(false);
            window.alert(result.messageToUser);
           }
          }
          
  return (
    <div className='register' id="register">
    <form autoComplete="on" method='POST'>
  <div className="mb-3 mt-3">
  <label  className="form-label">Name:</label>
    <input type="text" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e=>setName(e.target.value)} required/>

    <label  className="form-label">Address:</label>
    <input type="text" className="form-control" id="name" placeholder="Enter Address name" value={address} onChange={e=>setAddress(e.target.value)} required/>

    <label  className="form-label">College:</label>
    <input type="text" className="form-control" id="name" placeholder="Enter College name" value={college} onChange={e=>setCollege(e.target.value)} required/>

    <label  className="form-label">Email:</label>
    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e=>setEmail(e.target.value)} required/>
    
  </div>
  <div className="mb-3">
    <label className="form-label">Password:</label>
    <input type="password" autoComplete="new-password" className="form-control" id={password} placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} required/>

    <label  className="form-label">Confirm Password:</label>
    <input type="password" autoComplete="new-password" className="form-control" id={confirmPassword} placeholder="Confirm password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required/>
  </div>
  <div className="form-check mb-3">
    <label className="form-check-label">
      <input className="form-check-input" type="checkbox" checked={remember} onChange={e=>setRemember(!remember)}/> Remember me
    </label>
  </div>
  <input type="file" onChange={e=>setFile(e.target.files)} />
  <label></label>
  <button type="submit" className="btn btn-primary" onClick={submitForm}>Submit</button>
</form>
<label className="form-check-label">
   
    </label>
    </div>
  );
}
export default Register;