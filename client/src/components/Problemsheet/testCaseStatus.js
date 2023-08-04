import React, { useState } from "react";
import { answer } from "./Submit";
import './problemsheet.css'
let ans1=[1];

const Acc=()=>{
     console.log(answer); 
    return (
       <>
       <div>
       <div className="accp">
      <label>Test Case Stutas</label>
      {
         answer.map((val,i)=>
         (val==0 ?<label className="accq">Test case {i+1}: Worng</label>:<label className="accq">Test case {i+1}: Accept</label>)
         
         )
      }
      </div>
      </div>
      </>
    )
}
export default Acc;
