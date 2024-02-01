import './App.css';
import { BrowserRouter as Router, Routes, Route, Form, useLocation } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import landing from './components/landing';

function App() {
  return (
    <>
    <Routes>
        <Route path = "/" element = {<landing></landing>}></Route>
       
    </Routes>
    </>
  )
};

export default App;
