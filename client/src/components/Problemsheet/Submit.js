import React, { useState ,useEffect} from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
let ans=[];
const Submit=(props)=>{
  
  const navigate=useNavigate();
     let qno=props.p1;
     let [input,finput]=useState(props.p2);
     let [lan,flan]=useState('');
     let [code,fcode]=useState('');
     let [output,foutput]=useState('');
     let Run=async(val)=>{
      val.preventDefault();
      let cont={code:code,language:lan,input:input}
      console.log(cont);
      let res=await fetch('/test',{
        method:"POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body:JSON.stringify(cont)
      });
      let out=await res.json();
      if(out.err){
        foutput(out.err)
      }
      else
      foutput(out.data);
     }
     
     let sumit=async (val)=>{
      val.preventDefault();
      let cont={no:qno,code:code,language:lan,input:input}
      // console.log(cont);
      let res=await fetch('/submit',{
        method:"POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body:JSON.stringify(cont)
      });
      let out=await res.json();
      if(out.errr){
        foutput(out.errr)
      }
      else{
        ans=out.p;
        navigate('/accp');
      }
     }
    
    return(
        <>
        <div>
   <form>
   <div id = "div2">
    <textarea  cols="20" rows="20" placeholder='Type your code here' onChange={e=>fcode(e.target.value)}></textarea> 
  </div>
<select className="form-select form-select-sm sum" aria-label=".form-select-sm example" onClick={e=>flan(e.target.value)}>
  <option selected>Select language</option>
  <option value="java">Java</option>
  <option value="py" >Python	</option>
  <option value="cpp" >C++	</option>
  <option value="c" >C</option>
  <option value="go" >GoLang</option>
  <option value="cs">C#</option>
  <option value="js">NodeJs</option>
</select>
<pre>        </pre>
<button onClick={Run}>Run</button>
<button onClick={sumit}>Submit</button>
<pre>        </pre>
<div style={{width:'50%'}}>
<label>Custom Input:</label>
<textarea style={{width:'100%'}} cols="10" rows="5" placeholder='Enter Input here..' onChange={e=>finput(e.target.value)}  />
</div>
<div style={{width:'50%'}}>
<label>Output:</label>
<pre style={{width:'100%'}} cols="10" rows="5">{output}</pre>
</div>

</form>
</div>


</>

 )
}

export {ans, Submit};