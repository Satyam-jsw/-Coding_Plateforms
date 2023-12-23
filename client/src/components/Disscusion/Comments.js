import React from 'react'
import './comm.css'
import { useState,useEffect } from 'react'
import { json, useParams,useNavigate } from 'react-router-dom'

const Comments = () => {
  let navigate=useNavigate();
  let [user_name,setName]=useState();
  const  user=async ()=>{
    const response=await fetch('https://coding-platform-bitcode.vercel.app/home');
    let data=await response.json();
    setName(data.name);
  }

  const [blog,setBlog] = useState([]);
  const [comment,setnewComment]=useState('');
  const [post,setnewPost]=useState('');
  const [ok,setOk] = useState(false);
  const fun = async () => {
    const response = await fetch('https://coding-platform-bitcode.vercel.app/discussion');
    let data = await response.json();
    setBlog(data);
    
  }
 let commenting=async(e)=>{
      e.preventDefault();
      setOk(false);
     const id=e.target.id;
     if(user_name)
     {
     let response=await fetch('https://coding-platform-bitcode.vercel.app/thread',{
      method:"POST",
      headers:{
       'Content-Type':'Application/json',
       'Access-Control-Allow-Origin':'*'
      },
      body:JSON.stringify({id,user_name,post,comment})
  });
  let data = await response.json();
  setBlog(data);
  window.alert("Comment Successful");
   }
   else{
    window.alert('You are not login !');
    navigate("/login");
   }
  setnewComment('');
  setnewPost('');

 }

  useEffect(() => {
    fun();
    user();
  },[]);

  return (
    <>
      {/* <h1 className='post'>Add new post</h1>
      <form>
        <textarea placeholder='Write post here..!' value={post} onChange={(e) => setnewPost(e.target.value)}></textarea>
        <button onClick={commenting}>add blog</button>
      </form> */}
      {
        blog.map((value, ind) =>
          <>
            <div className="single-blog-box">
              <div className='main-blog-area'>
                <h1 className='blog-title'>{value.title}</h1>
                <h5 className='blog-name'>By : {value.Uname}</h5>
                <hr />
                <h2 className='blog-post'>{value.post}</h2>
              </div>
              <hr />
              Comments
              <br />
              {value.comments.map((value1, ind1) =>
                <>
                  <div className='blog-comments'>
                    <label className='blog-reply-user'>User : {value1.user_name}</label>
                    <div className='blog-reply'>Reply : {value1.comment}</div>
                    <br />
                  </div>
                </>
              )
              }
              {!ok && <button className='reply-btn' onClick={() => setOk(true)}><i class="fa fa-reply"></i>Reply</button>}
              {ok && <form>
                <textarea placeholder='Comment here..!' rows={4} cols={50} onChange={(e) => setnewComment(e.target.value)}></textarea>
                <br />
                <button id={value._id} onClick={commenting}>Add a Comment</button>
              </form>}
            </div>
          </>
        )
      }
    </>
  )
}

export default Comments