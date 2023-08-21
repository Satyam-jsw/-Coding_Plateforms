import React, { useState } from "react";
import INPUT from "./Addinput";
import { useNavigate } from "react-router-dom";
import "../Style/AddNewQuestion.css"
let Add = () => {
    const navigate = useNavigate();
    
    let [id,setId]=useState(0);
    const [question_title, setQuestion_title] = useState('');
    const [question_topic, setquestion_topic] = useState('');
    const [question_level, setQuestion_level] = useState('');
    const [acceptance_rate, setAcceptance_rate] = useState('');
    const [question_description, setQuestion_description] = useState('');
    const [constraints, setConstraints] = useState('');
    const [input_description, setInput_description] = useState('');
    const [output_description, setOutput_description] = useState('');
   
    const addNewQuestion = async (val) => 
    {
        
        val.preventDefault();
        const data = { question_title, question_level, acceptance_rate, question_description, question_topic, constraints, input_description, output_description };
        

        let response = await fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'applictaion/json'
            },
            body: JSON.stringify(data)
        })

        let result = await response.json();
        
        if (result.messageToUser === 1) 
        {   
            setId(result.no);
            window.alert("Your qusetion added Succesfully .");
        }
        else 
        {
            window.alert("Your question not added try again all filleds are compusalry !");

        }

    }

    return (
        <div>

<<<<<<< HEAD
            {/* <form>
=======
            <form>
>>>>>>> b1c0d2559f8d60736107956d9fde4b04027ae7d6
                <div style={{ width: '50%' }}>
                    <label>Enter title..</label>
                    <textarea style={{ width: '100%' }} cols="10" rows="5" placeholder='' onChange={e =>setQuestion_title(e.target.value)} />
                </div>
                <div style={{ width: '50%' }}>
                    <label>Enter topic..</label>
                    <textarea style={{ width: '100%' }} cols="10" rows="5" placeholder='' onChange={e => setquestion_topic(e.target.value)} />
                </div>
                <div style={{ width: '50%' }}>
                    <label>Enter level..</label>
                    <textarea style={{ width: '100%' }} cols="10" rows="5" placeholder='' onChange={e => setQuestion_level(e.target.value)} />
                </div>
                <div style={{ width: '50%' }}>
                    <label>Enter description..</label>
                    <textarea style={{ width: '100%' }} cols="10" rows="5" placeholder='' onChange={e => setQuestion_description(e.target.value)} />
                </div>
                <div style={{ width: '50%' }}>
                    <label>Enetr Constraints</label>
                    <textarea style={{ width: '100%' }} cols="10" rows="5" placeholder='' onChange={e => setConstraints(e.target.value)} />
                </div>
                <div style={{ width: '50%' }}>
                    <label>Enetr input description:</label>
                    <textarea style={{ width: '100%' }} cols="10" rows="5" placeholder='' onChange={e => setInput_description(e.target.value)} />
                </div>
                <div style={{ width: '50%' }}>
                    <label>Enter Output description:</label>
                    <textarea style={{ width: '100%' }} cols="10" rows="5" placeholder='' onChange={e => setOutput_description(e.target.value)} />
                </div>
                <button type='submit' onClick={addNewQuestion}>Submit</button>
<<<<<<< HEAD
            </form> */}
                        <form>
                <div className="form-row">
                    <div className="left">
                        <label>Enter Title</label>
                        <input type="text" placeholder="" onChange={(e) => setQuestion_title(e.target.value)} />
                    </div>
                    <div className="right">
                        <label>Choose Topic</label>

                        <select onChange={(e) => setquestion_topic(e.target.value)}>
                            <option value="Brute force">Brute force</option>
                            <option value="Array">Array</option>
                            <option value="sorting">sorting</option>
                            <option value="Greedy">Greedy</option>
                            <option value="Two Pointer">Two Pointer</option>
                            <option value="Searching">Searching</option>
                            <option value="Binary Search">Binary Search</option>
                            <option value="Binary Tree">Binary Tree</option>
                            <option value="BST">BST</option>
                            <option value="Graph">Graph</option>
                            <option value="Dynamic Programming">Dynamic Programming</option>
                            <option value="Trie">Trie</option>
                            <option value="Tree">Tree</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <label>Choose level of question</label>
                    <select onChange={(e) => setQuestion_level(e.target.value)}>
                        <option value="cakewalk">Cakewalk</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="form-row">
                    <label>Enter description of question</label>
                    <textarea
                        style={{ width: '100%', height: '100px', overflow: 'auto' }}
                        placeholder=""
                        onChange={(e) => setQuestion_description(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label>Enter Constraints</label>
                    <textarea
                        style={{ width: '100%', height: '100px', overflow: 'auto' }}
                        placeholder=""
                        onChange={(e) => setConstraints(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label>Enter input description</label>
                    <textarea
                        style={{ width: '100%', height: '100px', overflow: 'auto' }}
                        placeholder=""
                        onChange={(e) => setInput_description(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label>Enter output description</label>
                    <textarea
                        style={{ width: '100%', height: '100px', overflow: 'auto' }}
                        placeholder=""
                        onChange={(e) => setOutput_description(e.target.value)}
                    />
                </div>
                <div className="btna">
                <button type='submit' onClick={addNewQuestion}>Submit</button>
                </div>
=======
>>>>>>> b1c0d2559f8d60736107956d9fde4b04027ae7d6
            </form>

            <hr/>
             <INPUT no={id}/>
        </div>
    )
}

export {Add};
