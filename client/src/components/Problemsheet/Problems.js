import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';
import "../../App.css";
import 'bootstrap'
import Problem from './Question';
import Acc from './testCaseStatus';
let q = 0;
const Question = (props) => 
{
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
      <td><NavLink className="nav-link active" >{props.question_id}</NavLink></td>
      <td><NavLink className="nav-link active" to="/problem" onClick={() => { q = props.question_id }} >{props.question_title}</NavLink></td>
      <td>{props.question_level}</td>
      <td>{props.acceptance_rate}</td>
    </tr>
  );
}


const Problemsheet = () => {
  const [question, setQuestion] = useState([]);

  let fun = async () => {
    let response = await fetch('/qlist');
    let data = await response.json();
    
    setQuestion(data);
    console.log(question);
  };
  useEffect(() => {
    fun();
  }, []);

  // const handlePageClick = event => {
  //   const selected = event.selected;
  //   const offset = selected * pagination.numberPerPage
  //   setPagination({ ...pagination, offset })
  // }
  // const [pagination, setPagination] = useState({
  //   data: question,
  //   offset: 0,
  //   numberPerPage: 10,
  //   pageCount: 0,
  //   currentData: []
  // });
  // useEffect(() => {
  //   setPagination((prevState) => ({
  //     ...prevState,
  //     pageCount: prevState.data.length / prevState.numberPerPage,
  //     currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
  //   }))
  // }, [pagination.numberPerPage, pagination.offset]);


  return (
    <>

      <div className='container-fluid'>
        <div className='container table-mid'>
          <table className='table table-striped table-dark  table-responsive  '>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Problem</th>
                <th>
                  Level
                </th>
                <th>
                  Acceptance
                </th>
              </tr>
            </thead>
            <tbody>
              {question.map((value, ind) => <Question question_id={value.question_id}
                question_title={value.question_title} question_level={value.question_level} acceptance_rate={value.acceptance_rate} />
              )}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* <ReactPaginate
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
     
    /> */}
        </div>
      </div>
    </>
  )
}

export { q, Problemsheet }
