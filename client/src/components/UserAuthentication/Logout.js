import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
          fetch('https://coding-platform-bitcode.onrender.com/userlogout', {
            method: "DELEtE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials:"include"
          }).then((res) => {
            window.alert("User Logged Out");
            navigate('/login');
            window.location.reload(true);
            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
          }).catch((err) => {
            console.log(err);
          })
    }, [])
    
  return (
    <div></div>
  )
}

export default Logout