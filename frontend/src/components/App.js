import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Certifications from "../pages/Certifications";
import GetCertified from "../pages/GetCertified";
import Team from "../pages/Team";
import Train from "../pages/Train";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";


function App(){
  
  return (
    <Router>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/certifications" element={<PrivateRoute><Certifications /></PrivateRoute>} />
        <Route path="/get-certified" element={<PrivateRoute><GetCertified /></PrivateRoute>} />
        <Route path="/team" element={<PrivateRoute><Team /></PrivateRoute>} />
        <Route path="/train" element={<PrivateRoute><Train /></PrivateRoute>} />
      </Routes>

    </Router>
  );
}

  export default App;

