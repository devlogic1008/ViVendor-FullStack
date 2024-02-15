// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import SideNav from './Components/SideNav/SideNav';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Signup from './Components/Signup/Signup';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/*" element={<SideNav />} />
        
      </Routes>
    </Router>
  
  );
};

export default App;
