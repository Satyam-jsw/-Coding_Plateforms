import React, { useState } from "react";
import '../Style/testCaseStatus.css'
import { useParams } from "react-router-dom";


const Acc=()=>{
   const {str}=useParams();
   const jsonString = atob(str);
    const ans = JSON.parse(jsonString);
    console.log(ans);
     return (

      <div>
         <div className="accp">
            <label className="status-label">Test Case Status</label>
            {
               ans.map((val, i) =>
               (val === 0 ? (
                  <label key={i} className="accq wrong">
                     Test case {i + 1}: Wrong
                  </label>
               ) : (
                  <label key={i} className="accq accept">
                     Test case {i + 1}: Accepted
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
