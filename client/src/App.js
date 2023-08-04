import './App.css';
import { Route,Routes } from 'react-router-dom';
import {Problemsheet} from './components/Problemsheet/Problems';
import Problem from './components/Problemsheet/Question';
import Navbar from './components/Navbar';
import Comments from './components/Disscusion/Comments';
import Home from './components/Home';
import {Add} from './components/serverwork/AddNewQuestion';
import INPUT from './components/serverwork/Addinput';
import Acc from './components/Problemsheet/testCaseStatus';
import Login from './components/UserAuthentication/Login';
import Logout from './components/UserAuthentication/Logout';
import Register from './components/UserAuthentication/Register';
import Forgetpage from './components/UserAuthentication/forgetpage';
import Forget from './components/UserAuthentication/forgetpassword';
import Error from './components/Error';

function App() {
  return (
    <>
    <Navbar/>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/problemsheet' element={<Problemsheet/>}/>
      <Route path='/problem' element={<Problem/>}/>
      <Route path='/discussion' element={<Comments/>}/> 
      <Route path='/addnq' element={<Add/>}/>
      <Route path='/addinput' element={<INPUT/>}/>
      <Route path='/accp' element={<Acc/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/forgetpage/:token' element={<Forgetpage/>}/>
      <Route path='/forgetpass' element={<Forget/>}/>
      <Route path='*' element={<Error/>}></Route>
      
    </Routes>
    </>
  );
}

export default App;
