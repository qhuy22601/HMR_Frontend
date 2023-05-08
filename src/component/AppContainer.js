import React from "react";
import {  Route, Routes, HashRouter } from 'react-router-dom';


import AbsenceAdmin from "./admin/AbsenceAdmin";
import Signin from "./Signin";
import Home from "./Home";
import Employee from "./admin/Employee";
import State from "./State";
import Profile from "./Profile";
import Header from "./Header";


function AppContainer(){
return (
  <HashRouter>
    <Routes>
      <Route path="/" element={<State />} />
      <Route path="/leave" element={<AbsenceAdmin />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/headert" element={<Header />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </HashRouter>
);
}
export default AppContainer;