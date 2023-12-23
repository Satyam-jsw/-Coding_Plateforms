import React, { useEffect ,PureComponent} from "react";
import { useState } from "react";


let INPUT = (prop) => {
    let [Id, setId] = useState(0);
    let [input, setInput] = useState([]);
    let [output, setOutput] = useState([]);
    let [inputDummy, setInputDummy] = useState();
    let [arr, setArr] = useState([]);

    let addInput = async (val) => {

        val.preventDefault();

        let inputArray = [], outputArray = [];

        for (let i = 0; i < inputDummy; i++)
         {
            let inputData = document.getElementById(`input${i}`).value;
            let outputData = document.getElementById(`output${i}`).value;
            inputArray.push(inputData);
            outputArray.push(outputData);
        }
        setInput(inputArray);
        setOutput(outputArray);

        let data = { input: input, output: output, id: prop.no };

        let res = await fetch('https://coding-platform-bitcode.vercel.app/input', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
         
        let result = await res.json();
        if (result.messageToUser === 1) {
            window.alert("Input and Output are added succesfully");
        }
        else {
            window.alert("Input and Output are not added try again ");
        }
    }


    let fun = (val) => {
        val.preventDefault();
        let arr1 = [];
        for (let i = 0; i < inputDummy; i++)
            arr1.push('')
        setArr(arr1);

    }
   
let Fun=()=>{
    if(prop.no==0)
    {
       return(
        <>
        <form>
        <h1> Test Case Area </h1>
                   <div >
                    <label>Enter s.no. of question</label>
                    <input placeholder='' onChange={e => setId(e.target.value)} value={Id} />
                    <div>
                        <label>Enter number of test cases </label>
                        <input  placeholder='' onChange={e => setInputDummy(e.target.value)} value={inputDummy} />
                   </div> 
                   </div>
        </form> 
        </>
       )
    }
    else
    {
            return(
             <>
              <div style={{ width: '50%' }}>
                    <label>Your question number:{prop.no}</label>
              </div>
              <div style={{ width: '50%' }}>
                    <label>Enter test cases numbers:</label>
                    <textarea style={{ width: '100%' }} cols="10" rows="3" placeholder='' onChange={e => setInputDummy(e.target.value)}>{inputDummy}</textarea>
                </div>
             </>
            )
    }
}
    return (
        <div>
            
             <form>
               <Fun/>
                <button type="submit" onClick={fun}>submit</button>
            </form>
            <form>
                {
                    arr.map((val, i) => <>
                        <div style={{ width: '50%' }}>
                            <label>Enetr Input : {i + 1}</label>
                            <textarea id={`input${i}`} style={{ width: '100%' }} cols="10" rows="5" placeholder='' >{input[i]}</textarea>
                        </div>
                        <div style={{ width: '50%' }}>
                            <label>Enter Output : {i + 1}</label>
                            <textarea id={`output${i}`} style={{ width: '100%' }} cols="10" rows="5" placeholder='' >{output[i]}</textarea>
                        </div>
                    </>)
                }
             <hr />
                <h4> Submit test cases</h4>
                <button type='submit' onClick={addInput}> Submit </button>
            </form>
        </div>
    )
}

export default INPUT;
