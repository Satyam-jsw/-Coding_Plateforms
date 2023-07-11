import React from "react";
import { useState } from "react";
import { id } from "./Addnq";

let INPUT=()=>{
       
       let  [id2,id1]=useState(id);
       let [input,finput]=useState([]);
       let [output,foutput]=useState([]);
       let [inputnum,finputnum]=useState();
       let [arr,farr]=useState([]);
       let adding=async (val)=>{
        val.preventDefault();
        let inp=[],out=[];
        for(let i=0;i<inputnum;i++){
        let v1=document.getElementById(`input${i}`).value;
        let v2=document.getElementById(`output${i}`).value;
        inp.push(v1);
        out.push(v2);
        }
        finput(inp);
        foutput(out);
        let data={input:input,output:output,id:id2};
        let res = await fetch('/input',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        });
        let mess=await res.json();
        if(mess.message===1)
        {
            window.alert("Input and Output are added succesfully");
        }
        else{
            window.alert("Input and Output are not added try again ");
        }
        console.log({input,output,inputnum})
       }
      
      
       let fun=(val)=>{
        val.preventDefault();
        let arr1=[]
        for(let i=0;i<inputnum;i++)
        arr1.push('')
       farr(arr1);
       
    }
    

   return (
        <div>
        
        <form>
        <div style={{width:'50%'}}>
        <label>Enter custom question number:</label>
        <textarea style={{width:'40%'}} cols="1" rows="1" placeholder='' onChange={e=>id1(e.target.value)}>{id2}</textarea>
        </div>
         <div style={{width:'50%'}}>
        <label>Enter input numbers:</label>
        <textarea style={{width:'100%'}} cols="10" rows="3" placeholder='' onChange={e=>finputnum(e.target.value)}>{inputnum}</textarea>
        </div>
        <button type="submit" onClick={fun}>submit</button>
            </form>
        <form>
        {
            arr.map((val,i)=><>
                <div style={{width:'50%'}}>
                <label>Enetr Input : {i+1}</label>
                <textarea id={`input${i}`} style={{width:'100%'}} cols="10" rows="5" placeholder='' >{input[i]}</textarea>
                </div>
                <div style={{width:'50%'}}>
                <label>Enter Output : {i+1}</label>
                <textarea id={`output${i}`} style={{width:'100%'}} cols="10" rows="5" placeholder='' >{output[i]}</textarea>
                </div>  
                </>)
        }
        <button type='submit' onClick={adding}>Submit</button>
        </form>
        </div>
    )
}

export default INPUT;