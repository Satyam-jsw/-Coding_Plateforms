import React, { useContext, useEffect } from 'react';
// import './css/home.css';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, useNavigate } from 'react-router-dom';
// import { UserContext } from '../App';

const Logout = () => {
    // const {state,dispatch}=useContext(UserContext)
    const navigate = useNavigate();
    let fun = async () => {

        const res = await fetch('/tologout', {
            method: 'DELETE',
            headers: {
                'Contian-Type': 'application/json'
            }
        });
        const data = await res.json();
        if (data.status==0) 
        {
            window.alert(data.messageToUser);
        }
        else 
        {
            // dispatch({type:"USER",payload:false});
            navigate('/login');
            window.alert(data.messageToUser);
        }
    }
    useEffect(() => {
        fun();
    }, []);
    
    return (
        <>
            <h1>You have logout suuccesfully</h1>
        </>
    )
}

export default Logout;