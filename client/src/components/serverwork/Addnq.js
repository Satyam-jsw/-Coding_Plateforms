import React,{ useState } from "react";
import INPUT from "./Addinput";
import { useNavigate } from "react-router-dom";
let id=0;
let Add=()=>{
    const navigate=useNavigate();
   
     const [qtitle,fqtitle]=useState('');
     const [topic,ftopic]=useState('');
     const [level,flevel]=useState('');
     const [accr,faccr]=useState('');
     const [qdesc,fqdesc]=useState('');
     const [cons,fconst]=useState('');
     const [inputf,finputf]=useState('');
     const [outputf,foutputf]=useState('');
     const adding=async(val)=>{
        val.preventDefault();
         const data={qtitle,level,accr,qdesc,topic,const:cons,inputf,outputf};
         console .log(data);
         let res=await fetch('/add',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'applictaion/json'
            },
            body:JSON.stringify(data)
         })
         let val1=await res.json();
         id=val1.no;
         console.log(val1);
         if(val1.message===1){
           window.alert("Your qusetion added Succesfully ."); 
          navigate('/addinput')
         }
         else{
            window.alert("Your question not added try again all filleds are compusalry !");
            
        }
           
     }
    
    return (
        <div>
        <from>
        <div style={{width:'50%'}}>
        <label>Enter title..</label>
        <textarea style={{width:'100%'}} cols="10" rows="5" placeholder='' onChange={e=>fqtitle(e.target.value)}  />
        </div>
        <div style={{width:'50%'}}>
        <label>Enter Topic..</label>
        <textarea style={{width:'100%'}} cols="10" rows="5" placeholder='' onChange={e=>ftopic(e.target.value)}  />
        </div>
        <div style={{width:'50%'}}>
        <label>Enter level..</label>
        <textarea style={{width:'100%'}} cols="10" rows="5" placeholder='' onChange={e=>flevel(e.target.value)}  />
        </div>
        <div style={{width:'50%'}}>
        <label>Enter description..</label>
        <textarea style={{width:'100%'}} cols="10" rows="5" placeholder='' onChange={e=>fqdesc(e.target.value)}  />
        </div>
        <div style={{width:'50%'}}>
        <label>Enetr Constraints</label>
        <textarea style={{width:'100%'}} cols="10" rows="5" placeholder='' onChange={e=>fconst(e.target.value)}  />
        </div>
        <div style={{width:'50%'}}>
        <label>Enetr input description:</label>
        <textarea style={{width:'100%'}} cols="10" rows="5" placeholder='' onChange={e=>finputf(e.target.value)}  />
        </div>
        <div style={{width:'50%'}}>
        <label>Enter Output description:</label>
        <textarea style={{width:'100%'}} cols="10" rows="5" placeholder='' onChange={e=>foutputf(e.target.value)}  />
        </div>
        <button type='submit' onClick={adding}>Submit</button>
        </from>
        
        </div>
    )
}

export {id, Add};