import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../Style/problems.css'
// import Problem from './Question';
// import Acc from './testCaseStatus';
let q = 0;
const Question = (props) => 
{
 
  const difficulty = props.difficulty;
  const cnt = props.id;

  return (
    <tr>
      <th ><NavLink className="nav-link active" >{props.question_id}</NavLink></th>
      <td><NavLink className="nav-link active" to={`/problem/${props.question_id}`} >{props.question_title}</NavLink></td>
      <td>{props.question_level}</td>
    </tr>
  );
}


const Problemsheet = () => {
  const [question, setQuestion] = useState([]);
  const [search,setSearch] = useState('');
  const [filteredquestion,setFilteredquestion]=useState([]);

const handleChange = (e)=>{
  const searchTerm = e.target.value.toLowerCase();
  setSearch(searchTerm);
  
};
useEffect(() => {
  const arr = question.filter((ques) => {
    let str=ques.question_title+ques.question_level;
    return str.toLowerCase().includes(search.toLowerCase());
  });
  setFilteredquestion(arr);
  
}, [search, question]);

  let fun = async () => {
    let response = await fetch('/qlist');
    let data = await response.json();
    setQuestion(data);
  };
  useEffect(() => {
    fun();
  }, []);

 

  return (
    <>     
      <div className='container-fluid d-flex justify-content-center align-items-center flex-column'>
          <div className="search">
                      <input className="form-control mr-sm-2" type="text" onChange={handleChange} placeholder='Search'/>
          </div>
          <div className='container-table'>
            <table className='table table-striped table-responsive'>
              <thead>
              <tr>
                  <th>Problem Id</th>
                  <th>Problem</th>
                  <th>Level</th>
                  </tr>              
              </thead>
              <tbody>
                    {filteredquestion.map((value) => (
                      <Question
                        question_id={value.question_id}
                        question_title={value.question_title}
                        question_level={value.question_level}
                      />
                    ))}
                  </tbody>
            </table>
          </div>
      </div>
    </>
  )
}

export default Problemsheet ;
