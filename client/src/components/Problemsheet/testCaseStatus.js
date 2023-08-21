import React, { useState } from "react";
import { answer } from "./Submit";
import '../Style/testCaseStatus.css'
let ans1=[1];

const Acc=()=>{
     console.log(answer); 
     return (

      <div>
         <div className="accp">
            <label className="status-label">Test Case Status</label>
            {
               ans1.map((val, i) =>
               (val === 0 ? (
                  <label key={i} className="accq wrong">
                     Test case {i + 1}: Wrong
                  </label>
               ) : (
                  <label key={i} className="accq accept">
                     Test case {i + 1}: Accept
                  </label>
               )))
            }

         </div>

         <div className="final-answer-border">
            {/* Your final answer content goes here */}
            <p>This is the final answer content.</p>
         </div>
      </div>

   )

}
export default Acc;
