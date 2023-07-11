import React from 'react';
// import './css/home.css';
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink,useNavigate} from 'react-router-dom';
const Register=()=>{
          const navigate=useNavigate();
          
          let [name,fname]=useState('');
         
          let [email,femail]=useState('');
          let [address,faddress]=useState('');
          let [college,fcollege]=useState('');
          let [cpassword,fcpassword]=useState('');
          let [password,fpassword]=useState('');
          let [remember,fremember]=useState(false)
          const [file, setFile] = useState();
          let but=async (val)=>{
            val.preventDefault();
            let data={name,email,password,cpassword,remember,address,college};
            console.log(data);
            const res=await fetch("/register",{
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
              body:JSON.stringify(data)
            });
           const resp=await res.json();
           if(res.status===400){
            window.alert(resp.message);
           }
           else{
            fname('');
            femail('');
            fpassword('');
            fcpassword('');
            faddress('');
            fcollege('');
            fremember(false);
            window.alert(resp.message);
           }
          }
  return (
    <div className='register' id="register">
    <form autoComplete="on" method='POST'>
  <div className="mb-3 mt-3">
  <label  className="form-label">Name:</label>
    <input type="text" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e=>fname(e.target.value)} required/>

    <label  className="form-label">Address:</label>
    <input type="text" className="form-control" id="name" placeholder="Enter Address name" value={address} onChange={e=>faddress(e.target.value)} required/>

    <label  className="form-label">College:</label>
    <input type="text" className="form-control" id="name" placeholder="Enter College name" value={college} onChange={e=>fcollege(e.target.value)} required/>

    <label  className="form-label">Email:</label>
    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e=>femail(e.target.value)} required/>
    
  </div>
  <div className="mb-3">
    <label className="form-label">Password:</label>
    <input type="password" autoComplete="new-password" className="form-control" id={password} placeholder="Enter password" value={password} onChange={e=>fpassword(e.target.value)} required/>

    <label  className="form-label">Confirm Password:</label>
    <input type="password" autoComplete="new-password" className="form-control" id={cpassword} placeholder="Confirm password" value={cpassword} onChange={e=>fcpassword(e.target.value)} required/>
  </div>
  <div className="form-check mb-3">
    <label className="form-check-label">
      <input className="form-check-input" type="checkbox" checked={remember} onChange={e=>fremember(!remember)}/> Remember me
    </label>
  </div>
  <input type="file" onChange={e=>setFile(e.target.files)} />
  <label></label>
  <button type="submit" className="btn btn-primary" onClick={but}>Submit</button>
</form>
<label className="form-check-label">
   
    </label>
    </div>
  );
}
export default Register;