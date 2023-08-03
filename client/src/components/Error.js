import React, { useEffect } from 'react';
// import './css/home.css'
import { useState } from 'react';
const Error=()=>{
    let [error,ferror]=useState('');
    let fun=()=>{
    ferror("404 page not found");
    }
    useEffect(()=>{
        fun();
    },[]);
  return (
    <div>
     <h1>{error}</h1>
    </div>
  );
}
export default Error;