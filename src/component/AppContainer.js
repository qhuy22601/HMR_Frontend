import React from "react";
import { HashRouter, Route, Routes } from 'react-router-dom';
import AbsenceAdmin from "./admin/AbsenceAdmin";
import Signin from "./Signin";
import Employee from "./admin/Employee";
import State from "./State";
import Profile from "./Profile";
import Header from "./Header";
import Chat from "./pages/Chat"
import Test from "./Test";
import UploadPage from "./pages/UploadPage";
import FileDisplay from "./pages/FileDisplay";
import AttendancePage from "./pages/Attendance";
import Account from "./Account";
import Setting from "./Setting";

function AppContainer(){
return (
  <HashRouter>
    <Routes>
      <Route path="/" element={<State />} />
      <Route path="/leave" element={<AbsenceAdmin />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/headert" element={<Header />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/test" element={<UploadPage />} />
      <Route path="/testreal" element={<Test />} />
      <Route path="/test2" element={<FileDisplay />} />
      <Route path="/attendace" element={<AttendancePage />} />
      <Route path="/account" element={<Account />} />
      <Route path="/settings" element={<Setting />} />
    </Routes>
  </HashRouter>
);
}
export default AppContainer;