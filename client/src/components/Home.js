import React from "react";
import '../App.css';
import { useState,useEffect } from "react";
import {NavLink,Link,useNavigate} from 'react-router-dom';
import './Style/Home.css'
import DonutChart from './Chart'
let Home=()=>{
    const navigate=useNavigate();
       const [question,setQuestion]=useState([
       {no:1,name:'String Count',level:'Easy',status:'Attempted'},
       {no:2,name:'Counts of GCD',level:'Easy',status:'Attempted'},
       {no:3,name:'Valid Lock-key Pair',level:'Easy',status:'Attempted'},
       {no:4,name:'Pair Count',level:'Easy',status:'Attempted'},
       {no:5,name:'Magic Numbers',level:'Medium',status:'Attempted'}]);
       
       let [name,setName]=useState('');
       let [email,setEmail]=useState('');
       let [address,setAddress]=useState('');
       let [college,setCollege]=useState('');
       let [attempted,setAttempted]=useState(5);
       let [solved,setSolved]=useState(5);
       let [image,setImage]=useState();
       let [chartdata,setChartdata] =useState([
        { value: 40 },
        { value: 25 },
        { value: 15 }
      ]);
      
       const fun=async ()=>{
        const response=await fetch('https://coding-platform-bitcode.onrender.com/home');
        let data=await response.json();
        setName(data.name);
        setEmail(data.email);
        setAddress(data.address);
        setCollege(data.college);
        // setSolved(data.solved);
        // setAttempted(data.attempted);
        setImage(data.image);
        if(data.messageToUser!=''){
        Window.alert(data.messageToUser);
        navigate('/login')}
        // setQuestion(data.history);
       };
       console.log(question);
       useEffect(()=>{
        fun();
      },[]);
    
      return (
        <> 
            <div className="container-fluid">
                <div className="profile">
                    <div className="profile-header">
                        <div className="profile-header-cover"></div>
                        <div className="profile-header-content">
                            <div className="profile-header-img">
                                <img src={image} alt="" />
                            </div>
                            <ul className="profile-header-tab nav nav-tabs nav-tabs-v2">
                                <li className="nav-item">
                                    <NavLink to="#profile-post" className="nav-link" data-toggle="tab">
                                        <div className="nav-field">Attempted</div>
                                        <div className="nav-value">{attempted}</div>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="#profile-post" className="nav-link" data-toggle="tab">
                                        <div className="nav-field">Solved</div>
                                        <div className="nav-value">{solved}</div>
                                    </NavLink>
                                </li>
                                {/* <Modal /> */}
                            </ul>
                            
                        </div>
                        
                    </div>
                    <div className="profile-container">
                        <div className="profile-sidebar">
                            <div className="desktop-sticky-top">
                                <h4>{name}</h4>                                
                                <div className="font-weight-600 mb-3 text-muted mt-n2">{email}</div>
                                <div className="mb-1"><i className="fa fa-map-marker-alt fa-fw text-muted"></i> {address}</div>
                                <div className="mb-3"><i className="fa fa-link fa-fw text-muted"></i>{college}</div>
                                <div class="d-grid gap-2">
                                    <button type="button" class="btn btn-primary">
                                    <Link to = "/createpost" style={{color: "inherit", textDecoration:"none"}}>Create a Post</Link>
                                    </button>
                                </div>
                                <hr className="mt-4 mb-4" />
                                
                            </div>
                        </div>
         <div className='container-fluid'>
            <div className="d-flex  justify-content-around" >
                <div > <DonutChart data={chartdata}  /></div>
                <div> <DonutChart data={chartdata} /></div>
            </div>
            <table className='table table-striped table-responsive'>
              <thead>
              <tr>
                  <th>Problem Id</th>
                  <th>Title</th>
                  <th>Level</th>
                  <th>Status</th>
                  </tr>              
              </thead>
              <tbody>
              {
                question.map((val, i) =>(
                    <tr>
                    <th ><NavLink className="nav-link active" >{val.no}</NavLink></th>
                    <td><NavLink className="nav-link active" to={`/problem/${val.no}`}  >{val.name}</NavLink></td>
                    <td>{val.level}</td>
                    <td>{val.status}</td>
                  </tr>
                ))
            }
                  </tbody>
            </table>
         </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default Home;
