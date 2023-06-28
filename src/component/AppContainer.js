import React from "react";
// import { HashRouter, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AbsenceAdmin from "./admin/AbsenceAdmin";
import Signin from "./Signin";
import Employee from "./admin/Employee";
import State from "./State";
import Profile from "./Profile";
import Header from "./Header";
import Chat from "./pages/Chat"
import Test from "./Test";
import Test6 from "./Test6";
import Test7 from "./Test7";
import Test8 from "./Test8";
import UploadPage from "./pages/UploadPage";
import FileDisplay from "./pages/FileDisplay";
import AttendancePage from "./pages/Attendance";
import Account from "./Account";
import Setting from "./Setting";
import Error from "./pages/404";
import Application from "./pages/Application";
function AppContainer(){
return (
  <Router>
    <Routes>
      <Route path="/" element={<State />} />
      <Route path="/leave" element={<AbsenceAdmin />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/headert" element={<Header />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/testreal" element={<Test />} />
      <Route path="/test2" element={<FileDisplay />} />
      <Route path="/attendace" element={<AttendancePage />} />
      <Route path="/account" element={<Account />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/app" element={<Application />} />
      <Route path="/image" element={<Test6 />} />
      <Route path="/attendance" element={<Test7 />} />
      <Route path="/checkout" element={<Test8 />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </Router>
);
}
export default AppContainer;