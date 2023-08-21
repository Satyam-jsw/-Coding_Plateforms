import React, { useEffect } from 'react';
import './Style/Error.css';
import {useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Error=()=>{
  const navigate=useNavigate();
    let [error,ferror]=useState('');
    let fun=(e)=>{
     e.preventDefault();
     navigate('/');
    };
  return (
    <div>
    <div class="wrapper">
  <div class="landing-page">
    <h1> 404 Error.</h1>
    <p> We can't find the page you're looking for.</p>
    <button onClick={fun}>Back to home</button>
  </div>
</div>
    </div>
  );
}
export default Error;
