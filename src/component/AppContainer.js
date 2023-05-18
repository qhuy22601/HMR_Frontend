import React from "react";
import { HashRouter, Route, Routes } from 'react-router-dom';
import AbsenceAdmin from "./admin/AbsenceAdmin";
import Signin from "./Signin";
import Employee from "./admin/Employee";
import State from "./State";
import Profile from "./Profile";
import Header from "./Header";
import ChatWebSocket from "./ChatWebSocket";


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
      <Route path="/chat" element={<ChatWebSocket />} />
    </Routes>
  </HashRouter>
);
}
export default AppContainer;