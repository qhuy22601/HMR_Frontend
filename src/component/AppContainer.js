import React from "react";
import {  Route, Routes, HashRouter } from 'react-router-dom';


import AbsenceAdmin from "./admin/AbsenceAdmin";
import Signin from "./Signin";
import Home from "./Home";
import Employee from "./admin/Employee";
import State from "./State";
import Profile from "./Profile";


function AppContainer(){
return(
      <HashRouter>
      <Routes>
        <Route path="/" element={<State/>} />
        <Route path="/login" element={<Signin/>} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/home" element={<Home/>}>
          <Route path="absence" element={<AbsenceAdmin/>}/>
          <Route path="employee" element={<Employee/>}/>
        </Route>
      </Routes>
    </HashRouter>
);
}
export default AppContainer;