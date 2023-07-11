import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';
import "../../App.css";
import 'bootstrap'
import Problem from './Question';
import Acc from './accp';
let q=0;
const Question=(props)=>{  
    const diff=props.difficulty;
    const cnt=props.id;
    var cl="";
    var cl1="";
    if(cnt%2){
      cl1="light-row"
    }else {
      cl1="dark-row";
    }
  
    return(
    <tr className={cl1}>
    <td><NavLink className="nav-link active" >{props.qid}</NavLink></td>
    <td><NavLink className="nav-link active" to="/problem" onClick={()=>{q=props.qid}} >{props.qname}</NavLink></td>
    <td>{props.level}</td>
    <td>{props.accr}</td>
     </tr>
    );
  }


const Problemsheet = () => {
  const [ques,fd1]=useState([]);
  let fun=async()=>{
   let res=await fetch('/qlist');
     let data=await res.json();
     console.log(data);
     fd1(data);
 
  };
  useEffect(()=>{
     fun();
  },[]);
 
    // const handlePageClick = event => {
    //   const selected = event.selected;
    //   const offset = selected * pagination.numberPerPage
    //   setPagination({ ...pagination, offset })
    // }
    // const [pagination, setPagination] = useState({
    //   data: ques,
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
        {ques.map((l,ind)=><Question qid={l.qid}
       qname={l.qtitle} level={l.level} accr={l.accr}/>
       )}
    </tbody>
    </table>
    </div>
    <div style={{ display: 'flex',  justifyContent: 'center'}}>
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

export {q, Problemsheet}
