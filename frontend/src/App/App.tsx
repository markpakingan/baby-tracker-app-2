import React, { useState } from 'react';
import './App.css';
import NavBar from '../Navbar';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import MyJournal from '../MyJournal';
import AddSched from '../forms/AddSched';
import Logout from '../Logout';
import SignUpForm from '../forms/SignupForm';
import LogInForm from '../forms/LoginForm';
import AddBabyForm from '../forms/AddBabyForm';
import Dashboard from '../Dashboard';
import ProfileForm from '../forms/ProfileForm';

function App() {



  return (
    <div className="App" >
        <BrowserRouter>
          <NavBar/>
            <Routes>
              <Route path ="/" element = {<Home/>} />
              <Route path ="/dashboard" element = {<Dashboard/>} />
              <Route path ="/my-journal" element = {<MyJournal/>} />
              <Route path ="/add-sched" element = {<AddSched/>} />
              <Route path ="/logout" element = {<Logout/>} />
              <Route path ="/signup" element = {<SignUpForm/>} />
              <Route path ="/login" element = {<LogInForm/>} />
              <Route path ="/add-baby" element = {<AddBabyForm/>} />
              <Route path ="/profile" element = {<ProfileForm/>} />
  ß          </Routes>     
        </BrowserRouter>
    </div>
  );
}

export default App;
