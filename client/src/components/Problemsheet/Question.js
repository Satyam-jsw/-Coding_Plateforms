import React, { useEffect } from 'react';
import "../../App.css";
import { useState } from 'react';
import '../Style/Question.css'
import { useParams } from 'react-router-dom';
import Landing from '../Editor/Landing';

const Problem = (props) => {
  const [question,setQuestion] = useState({});
  const [input,setInput]=useState([0]);
  const [output,setOutput]=useState([0]);
  const { number } = useParams();
  const ques = async () => { 
 
    let val={no:number};
    try {
       
      const res = await fetch("https://coding-platform-bitcode.onrender.com/sendq", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body:JSON.stringify(val)
      });

      const data = await res.json();
      setQuestion(data);
    setInput(data.input);
    setOutput(data.output);
      if(!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch {
      console.log("error");
    }
  }
  
  useEffect(() => {
   ques();
  },[])

  return (
    <>
    <div className='d-flex' >
        <div id="id1" className="question-container w-50 overflow-auto" style={{maxHeight:"100vh"}}>
            <div className="question-details w-100">
              <h2 className="question-title">
                {question.question_id}. {question.question_title}
              </h2>
              <div className="question-description">
                {question.question_description}
              </div>
              <div className="input-section">
                <label className="section-label">INPUT:</label>
                <pre className="section-content">{question.input_description}</pre>
              </div>
              <div className="constraints-section">
                <label className="section-label">CONSTRAINTS:</label>
                <pre className="section-content">{question.constraints}</pre>
              </div>
              <div className="output-section">
                <label className="section-label">OUTPUT:</label>
                <div className="output-content w-100">
                  <div>{question.output_description}</div>
                </div>
              </div>
              <div className="sample-section">
                <div className="sample-input">
                  <label className="section-label">Sample Input:</label>
                  <pre className="section-content">{input[0]}</pre>
                </div>

                <div className="sample-output">
                  <label className="section-label">Sample Output:</label>
                  <pre className="section-content">{output[0]}</pre>
                </div>
              </div>
            </div>
        </div>
      <Landing />
    </div>
    </>

  )
}


export default Problem