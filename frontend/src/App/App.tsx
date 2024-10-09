import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from '../navbar/Navbar';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import MyJournal from '../myJournal/MyJournal';
import AddSched from '../forms/AddSched';
import Logout from '../Logout';
import SignUpForm from '../forms/SignupForm';
import LogInForm from '../forms/LoginForm';
import AddBabyForm from '../forms/AddBabyForm';
import Dashboard from '../Dashboard/Dashboard';
import ProfileForm from '../forms/ProfileForm';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'))
  const storedToken = localStorage.getItem('token')
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken); 



  useEffect(()=> {

    const storedToken = localStorage.getItem('token'); 
    if(storedToken){
      setToken(storedToken)
      setIsAuthenticated(true)
    }
  }, [token])


  return (
    <div className="App" >
        <BrowserRouter>
          < NavBar isAuthenticated = {isAuthenticated}/>
            <Routes>
              <Route path ="/" element = {<Home/>} />
              <Route path ="/dashboard" element = {<Dashboard/>} />
              <Route path ="/my-journal" element = {<MyJournal/>} />
              <Route path ="/add-sched" element = {<AddSched/>} />
              <Route path ="/logout" element = {<Logout setIsAuthenticated={setIsAuthenticated}/>} />
              <Route path ="/signup" element = {<SignUpForm/>} />
              <Route path ="/login" element = {<LogInForm setToken={setToken}/>} />
              <Route path ="/add-baby" element = {<AddBabyForm/>} />
              <Route path ="/profile" element = {<ProfileForm/>} />
  ß          </Routes>     
        </BrowserRouter>
    </div>
  );
}

export default App;



//testing 2