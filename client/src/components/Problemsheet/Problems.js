import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';
import "../../App.css";
import 'bootstrap'
import '../Style/problems.css'
import Problem from './Question';
import Acc from './testCaseStatus';
let q = 0;
const Question = (props) => 
{
  let setq=function(){};
  [q,setq]=useState(0)
  const difficulty = props.difficulty;
  const cnt = props.id;
  var classId = "";

  if (cnt % 2)
   
  {
    classId = "light-row"
  } 
  else 
  {
    classId = "dark-row";
  }

  return (
    <tr className={classId}>
      <th scope="row"><NavLink className="nav-link active" >{props.question_id}</NavLink></th>
      <td><NavLink className="nav-link active" to={`/problem/${props.question_id}`} onClick={() => {setq(props.question_id) }} >{props.question_title}</NavLink></td>
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
    return ques.question_title.toLowerCase().includes(search.toLowerCase());
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
      
      <div className='container-fluid'>
      <div className="search" style={{backgroundColor:"transparent"}}>
                <form> 
                  <input className="form-control mr-sm-2" type="text" onChange={handleChange} placeholder='Search'/>
                </form>
          </div>
        <div className='container table'>
          <table className='table table-striped table-dark  table-responsive  '>
            <thead>
              <tr>
                <th scope="col">Problem Id</th>
                <th scope="col">Problem</th>
                <th scope="col">Level</th>
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
        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
           <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      pageCount={Math.ceil(pagination.pageCount)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      activeClassName={'active'}
      subContainerClassName={'pages pagination'} 
     
    /> 
        </div> */}
      </div>
    </>
  )
}

export default Problemsheet ;
