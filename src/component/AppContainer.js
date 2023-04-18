import React from "react";
import {  Route, Routes, HashRouter } from 'react-router-dom';


import AbsenceAdmin from "./admin/AbsenceAdmin";
import Signin from "./Signin";
import Header from "./Header";
import Home from "./Home";
import Employee from "./admin/Employee";


function AppContainer(){
return(
      <HashRouter>
      <Routes>
        <Route path="/" element={<Signin/>} />
        <Route path="/home" element={<Home/>}>
          <Route path="absence" element={<AbsenceAdmin/>}/>
          <Route path="employee" element={<Employee/>}/>
        </Route>
      </Routes>
    </HashRouter>
);
}
export default AppContainer;