import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const navigate = useNavigate();
    let [user_name, setName] = useState('');
    // const [comment, setnewComment] = useState('');
    const [post, setnewPost] = useState('');
    const [title, setTitle] = useState('');

    const user = async () => {
        const response = await fetch('/home', {
            method: "GET",
            headers: {
                'Content-Type': 'Application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let data = await response.json();
        setName(data.name);
    }
    
    let commenting = async (e) => {
    
        e.preventDefault();
        const id = e.target.id;
        let response = await fetch('/thread', {
            method: "POST",
            headers: {
                'Content-Type': 'Application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({user_name, post, title})
        });
        let data = await response.json();
        if (response.status == 404 || !data) {
            window.alert("Please Log In");
            navigate('/login');
        } else {
            window.alert("Blog created Successfully");
            navigate('/discuss');
        }
    }
    useEffect(() => {
        user();
    })
    return (
        <>
            <form>
                <textarea placeholder='Post Title' onChange={(e) => setTitle(e.target.value)}></textarea>
                <br />
                <textarea placeholder='  here..!' onChange={(e) => setnewPost(e.target.value)}></textarea>
                <br />
                <button onClick={commenting}>Add a Post</button>
            </form>
        </>
    )
}

export default CreatePost;