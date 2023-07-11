import React, { useContext, useEffect } from 'react';
// import './css/home.css';
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink,useNavigate} from 'react-router-dom';
// import { UserContext } from '../App';

const Logout=()=>{
    // const {state,dispatch}=useContext(UserContext)
    const navigate=useNavigate();
      let fun=async ()=>{
         
        const res=await fetch('/logout',{
            method:'DELETE',
            headers:{
                'Contian-Type':'application/json'
            }
        });
        const data=await res.json();
           if(res.status!=200){
            navigate('/logout');
            throw new Error(res.error);
           }
           else{
            // dispatch({type:"USER",payload:false});
            navigate('/login');
           }
      }
     useEffect(()=>{
      fun();
     },[]);
    return(
        <>
        <h1>You have logout suuccesfully</h1>
        </>
    )
}

export default Logout;