import React, { useState ,useEffect} from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
let answer=[];
const Submit=(props)=>{
  
  const navigate=useNavigate();
     let questinNo=props.p1;
     let [input,setInput]=useState(props.p2);
     let [lan,setLan]=useState('');
     let [code,setCode]=useState('');
     let [output,setOutput]=useState('');
     
     let Run=async(val)=>{
      val.preventDefault();
      let Data={code:code,language:lan,input:input}
      console.log(Data);
      let response=await fetch('/test',{
        method:"POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body:JSON.stringify(Data)
      });
      let output=await response.json();
      if(output.error){
        setOutput(output.error)
      }
      else
      setOutput(output.data);
     }
     
     let submitCode=async (val)=>{
      val.preventDefault();
      let Data={no:questinNo,code:code,language:lan,input:input}
      
      let response=await fetch('/submit',{
        method:"POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body:JSON.stringify(Data)
      });
      let output=await response.json();
      if(output.error){
        setOutput(output.error)
      }
      else{
        answer=output.result;
        navigate('/accp');
      }
     }
    
    return(
      <>
      <div>
        <form>

          <div style={{ marginBottom: '10px', width: '30%' }}>
            <select className="form-select form-select-sm sum" aria-label=".form-select-sm example" onClick={e => setLan(e.target.value)}>
              <option selected>Select language</option>
              <option value="java">Java</option>
              <option value="py" >Python	</option>
              <option value="cpp" >C++	</option>
              <option value="c" >C</option>
              <option value="go" >GoLang</option>
              <option value="cs">C#</option>
              <option value="js">NodeJs</option>
            </select>
          </div>
          <div id="div2">
            <textarea cols="20" rows="20" placeholder='Type your code here' onChange={e => setCode(e.target.value)}></textarea>
          </div>

          <div >
            <button onClick={Run} style={{ marginRight: '10px' }} className="btn_for_run_and_submit">Run</button>

            <button onClick={submitCode} className="btn_for_run_and_submit" >Submit</button>

          </div>


          <div style={{ width: '50%' }}>
            <label>Custom Input:</label>
            <textarea style={{ width: '100%' }} cols="10" rows="5" placeholder='Enter input here' onChange={e => setInput(e.target.value)} />
          </div>
          <div style={{ width: '50%' }}>
            <label>Output:</label>
              <pre style={{ width: '100%' }} cols="10" rows="5">{output}</pre>
          </div>

        </form>
      </div>
    </>

 )
}

export {answer, Submit};