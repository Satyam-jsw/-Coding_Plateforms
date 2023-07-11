import React, { useState } from "react";
import { ans } from "./Submit";
import './problemsheet.css'
let ans1=[1];

const Acc=()=>{
     console.log(ans); 
    return (
       <>
       <div>
       <div className="accp">
      <label>Test Case Stutas</label>
      {
         ans.map((val,i)=>
         (val==0 ?<label className="accq">Test case {i+1}: Worng</label>:<label className="accq">Test case {i+1}: Accept</label>)
         
         )
      }
      </div>
      </div>
      </>
    )
}
export default Acc;
