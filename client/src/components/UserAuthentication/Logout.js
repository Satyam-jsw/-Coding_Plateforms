import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    let fun = async () => {

        const res = await fetch('/userlogout', {
            method: 'DELETE',
            headers: {
                'Contian-Type': 'application/json'
            }
        });
        const data = await res.json();
        if (data.status==0) 
        {
            navigate('/login');
            window.alert(data.messageToUser);
        }
        else 
        {
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