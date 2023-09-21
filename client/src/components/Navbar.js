import React , { useEffect, useState }  from 'react'
import { NavLink } from 'react-router-dom'
import './Style/navbar.css'
const Navbar = () => {
  const [loggedin, setLoggedin] = useState(0);

  const fun = async () => {
    const response = await fetch("https://coding-platform-bitcode.onrender.com/home", {
      "method": "GET",
      "headers": {
        "Content-Type": "applications/json",
        "Control-Access-Allow-Origin": "*"
      }
    })
    let data = await response.json();
    if (response.status == 404 || !data) {
      setLoggedin(false);
    } else {
      setLoggedin(true);
    }
  }

  useEffect(() => {
    fun();
  })
  
  const RenderMenu = () => {
    if (loggedin) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/" >Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/problemsheet" >Problemsheet</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/discuss">Discuss</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/addnq">Add new problem</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/logout">Logout</NavLink>
          </li>
        </>
      )
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/problemsheet" >Problemsheet</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/discuss">Discuss</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/register">Register</NavLink>
          </li>
        </>
      )
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">BitCode</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <RenderMenu />
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Navbar