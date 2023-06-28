// import React, { useState, useCallback, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import styled from "styled-components";
// import { SideNav } from "../component/layouts/dashboard/side-nav";
// import { TopNav } from "../component/layouts/dashboard/top-nav";
// import axios from "axios";
// import {
//   Box,
//   Container,
//   Stack,
//   Typography,
//   Unstable_Grid2 as Grid,
//   Collapse,
//   TextField,
//   Avatar,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Divider,
// } from "@mui/material";
// import { ThemeProvider } from "@mui/material/styles";
// import { createTheme } from "./theme";
// import imageCompression from "browser-image-compression";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import EditIcon from "@mui/icons-material/Edit";
// import styles from "./styles/Profile.module.css";
// import Header from "./Header";
// import { backend } from "./utils/APIRoutes";

// const SIDE_NAV_WIDTH = 280;



// const LayoutRoot = styled.div`
//   display: flex;
//   flex: 1 1 auto;
//   margin-left:auto;
//   margin-right:0;
//   max-width: 100%;
//   ${({ theme }) => `
//     @media (min-width: ${theme.breakpoints}px) {
//       padding-left: ${SIDE_NAV_WIDTH}px;
//     }
//   `}
// `;

// const LayoutContainer = styled.div`
//   display: flex;
//   flex: 1 1 auto;
//   flex-direction: column;
//   width: 100%;
// `;

// function Account() {
//   const [profileData, setProfileData] = useState({
//     id: "",
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     address: "",
//     image: "",
//     gender: "",
//   });
//   const [image, setImage] = useState("");
//   const [file, setFile] = useState(null);
//   const [file64String, setFile64String] = useState(null);
//   const [file64StringWithType, setFile64StringWithType] = useState(null);
//   const [ava, setAva] = useState(localStorage.getItem("Avata"));
//   const [isEditing, setIsEditing] = useState(false);
//   const [openPersonal, setOpenPersonal] = useState(true);
//   const [personalDisabled, setPersonalDisabled] = useState(true);
//   const [id, setId] = useState(localStorage.getItem("Id"));

//   const handleLoginRedirect = () => {
//     window.location.href = "#/login";
//   };

//   const location = useLocation();
//   const [openNav, setOpenNav] = useState(false);

//   const handlePathnameChange = useCallback(() => {
//     if (openNav) {
//       setOpenNav(false);
//     }
//   }, [openNav]);

//   useEffect(() => {
//     handlePathnameChange();
//   }, [location.pathname, handlePathnameChange]);

//   useEffect(() => {
//     async function fetchProfileData() {
//       const res = await axios.get(`${process.env.REACT_APP_BACK_END}/api/auth/user/` + id);
//       setProfileData(res.data);
//     }
//     fetchProfileData();
//   }, [id]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };
//   function onUploadFileChange(e) {
//     setFile64String(null);
//     if (e.target.files < 1 || !e.target.validity.valid) {
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setImage(reader.result);
//       }
//     };
//     reader.readAsDataURL(e.target.files[0]);
//     compressImageFile(e);
//   }

//   function fileToBase64(file, cb) {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//       cb(null, reader.result);
//     };
//     reader.onerror = function (error) {
//       cb(error, null);
//     };
//   }

//   async function compressImageFile(event) {
//     const imageFile = event.target.files[0];

//     const options = {
//       maxWidthOrHeight: 250,
//       useWebWorker: true,
//     };
//     try {
//       const compressedFile = await imageCompression(imageFile, options);

//       fileToBase64(compressedFile, (err, result) => {
//         if (result) {
//           setFile(result);
//           setFile64StringWithType(result);
//           setFile64String(String(result.split(",")[1]));
//         }
//       });
//     } catch (error) {
//       setFile64String(null);
//     }
//   }

//   const handleSaveClick = async () => {
//     try {
//       await axios.post(`${process.env.REACT_APP_BACK_END}/api/auth/change`, {
//         id: profileData.id,
//         firstName: profileData.firstName,
//         lastName: profileData.lastName,
//         phoneNumber: profileData.phoneNumber,
//         address: profileData.address,
//         image: file64StringWithType,
//       });

//       setIsEditing(false);

//       localStorage.setItem("Email", profileData.email);
//       localStorage.setItem("Id", profileData.id);
//       localStorage.setItem(
//         "FirstName",
//         profileData.firstName
//       );
//       localStorage.setItem(
//         "LastName",
//         profileData.lastName
//       );
//       localStorage.setItem("Gender", profileData.gender);
//       localStorage.setItem("Address", profileData.address);
//       localStorage.setItem(
//         "PhoneNumber",
//         profileData.phoneNumber
//       );
//       localStorage.setItem("isAvatarImageSet", true);
//       localStorage.setItem("UserAvata", profileData.image);

//       if (profileData.image != null) {
//         localStorage.setItem("Avata", profileData.image);
//       } else {
//         localStorage.setItem("Avata", "");
//       }
//       sessionStorage.setItem(
//         "Password",
//         profileData.password
//       );
//       localStorage.setItem(
//         "chat-app-current-user",
//         JSON.stringify(profileData)
//       );

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleOpenPersonal = () => {
//     setOpenPersonal((prev) => !prev);
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <ThemeProvider theme={createTheme()}>
//       <>
//         {/* <TopNav onNavOpen={() => setOpenNav(true)} onLoginRedirect={handleLoginRedirect} /> */}
//         <Header onLoginRedirect={handleLoginRedirect}></Header>
//         <SideNav onClose={() => setOpenNav(false)} open={openNav} />
//         <LayoutRoot>
//           <LayoutContainer>
//             <Box
//               component="main"
//               sx={{
//                 flexGrow: 1,
//                 py: 8,
//               }}
//             >
//               <Container maxWidth="lg">
//                 <Stack spacing={3}>
//                   <div>
//                     <Typography variant="h4">Tài khoản</Typography>
//                   </div>
//                   <Card style={{ width: "80%", marginTop: "70px" }}>
//                     <Box sx={{ p: 0, pb: 1 }} dir="ltr">
//                       <Grid
//                         container
//                         columnSpacing={2}
//                         rowSpacing={2}
//                         direction="row"
//                         justifyContent="flex-end"
//                         alignItems="flex-end"
//                       ></Grid>
//                       <Grid
//                         container
//                         direction="rows"
//                         justifyContent="space-between"
//                       >
//                         <Grid item>
//                           <Button
//                             sx={{ mt: 2 }}
//                             variant="standard"
//                             endIcon={
//                               openPersonal ? (
//                                 <KeyboardArrowUpIcon />
//                               ) : (
//                                 <KeyboardArrowDownIcon />
//                               )
//                             }
//                             onClick={handleOpenPersonal}
//                           >
//                             <Typography variant="overline">
//                               Tài khoản
//                             </Typography>
//                           </Button>
//                         </Grid>
//                         <Grid item>
//                           {openPersonal && (
//                             <>
//                               <Button
//                                 variant="contained"
//                                 sx={{ mt: 2, ml: 2 }}
//                                 color="primary"
//                                 endIcon={<EditIcon />}
//                                 onClick={() =>
//                                   setPersonalDisabled((prev) => !prev)
//                                 }
//                               >
//                                 Sửa
//                               </Button>
//                               {!personalDisabled && (
//                                 <Button
//                                   sx={{ mt: 2, ml: 2 }}
//                                   variant="contained"
//                                   color="primary"
//                                   onClick={handleSaveClick}
//                                 >
//                                   Lưu
//                                 </Button>
//                               )}
//                             </>
//                           )}
//                         </Grid>
//                       </Grid>
//                       <Collapse
//                         in={openPersonal}
//                         timeout="auto"
//                         unmountOnExit
//                         style={{ display: "flex" }}
//                       >
//                         <div className={styles.profile_image}>
//                           {image || profileData.image ? (
//                             <img
//                               src={image || profileData.image}
//                               alt="Profile"
//                               value={profileData.image}
//                             />
//                           ) : (
//                             <div className={styles.no_image}>
//                               No image selected
//                             </div>
//                           )}
//                           <input
//                             className="inside"
//                             type="file"
//                             accept=".jpg, .jpeg, .png"
//                             onChange={onUploadFileChange}
//                           />
//                         </div>
//                         <div>
//                           <Grid
//                             sx={{ p: 1, pb: 5, pt: 5 }}
//                             container
//                             columnSpacing={2}
//                             rowSpacing={2}
//                             direction="row"
//                             justifyContent="flex-start"
//                             alignItems="flex-start"
//                           >
//                             <Grid item xs={8} xl={4}>
//                               <TextField
//                                 disabled={personalDisabled}
//                                 variant="standard"
//                                 style={{ width: "100%" }}
//                                 size="small"
//                                 type="email"
//                                 name="email"
//                                 value={profileData.email}
//                                 onChange={handleInputChange}
//                               />
//                             </Grid>
//                             <Grid item xs={8} xl={4}>
//                               <TextField
//                                 disabled={personalDisabled}
//                                 variant="standard"
//                                 style={{ width: "100%" }}
//                                 size="small"
//                                 label="First Name"
//                                 name="firstName"
//                                 value={profileData.firstName}
//                                 onChange={handleInputChange}
//                               />
//                             </Grid>
//                             <Grid item xs={12} xl={4}>
//                               <TextField
//                                 disabled={personalDisabled}
//                                 variant="standard"
//                                 style={{ width: "100%" }}
//                                 size="small"
//                                 name="lastName"
//                                 label="Last Name"
//                                 value={profileData.lastName}
//                                 onChange={handleInputChange}
//                               />
//                             </Grid>
//                             <Grid item xs={12} xl={4}>
//                               <TextField
//                                 disabled={personalDisabled}
//                                 variant="standard"
//                                 style={{ width: "100%" }}
//                                 size="small"
//                                 name="address"
//                                 label="Address"
//                                 value={profileData.address}
//                                 onChange={handleInputChange}
//                               />
//                             </Grid>
//                             <Grid item xs={8} xl={4}>
//                               <TextField
//                                 disabled={personalDisabled}
//                                 variant="standard"
//                                 style={{ width: "100%" }}
//                                 size="small"
//                                 name="phoneNumber"
//                                 label="Phone Number"
//                                 value={profileData.phoneNumber}
//                                 onChange={handleInputChange}
//                               />
//                             </Grid>
//                             {/* <Grid item xs={7} xl={3}>
//                         <TextField
//                           disabled={personalDisabled}
//                           style={{ width: "100%" }}
//                           variant="standard"
//                           value={values.gender}
//                           onChange={handleChange}
//                           select
//                           name="Gender"
//                           label="Gender"
//                           size="small"
//                           sx={DisabledTextBox}
//                         >
//                           <MenuItem key={"Male"} value="Male">
//                             Male
//                           </MenuItem>
//                           <MenuItem key={"Female"} value="Female">
//                             Female
//                           </MenuItem>
//                         </TextField>
//                       </Grid>
//                       <Grid item xs={8} xl={4}>
//                         <LocalizationProvider dateAdapter={AdapterDateFns}>
//                           <DatePicker
//                             sx={DisabledTextBox}
//                             disabled={personalDisabled}
//                             variant="standard"
//                             size="small"
//                             label="Date of Birth"
//                             name="birthDate"
//                             renderInput={(params) => (
//                               <TextField
//                                 {...params}
//                                 variant="standard"
//                                 sx={DisabledTextBox}
//                               />
//                             )}
//                           />
//                         </LocalizationProvider>
//                       </Grid> */}
//                           </Grid>
//                         </div>
//                       </Collapse>
//                     </Box>
//                   </Card>
//                 </Stack>
//               </Container>
//             </Box>
//           </LayoutContainer>
//         </LayoutRoot>
//       </>
//     </ThemeProvider>
//   );
// }

// export default Account;
// import React, { useState, useEffect, useCallback } from "react";
// import styles from "./styles/Profile.module.css";
// import imageCompression from "browser-image-compression";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import * as yup from "yup";
// import { Formik } from "formik";
// import { useLocation } from "react-router-dom";
// import styled from "styled-components";
// import Form from "react-bootstrap/Form";
// import Header from "./Header";
// import { SideNav } from "../component/layouts/dashboard/side-nav";
// import {
//   MenuItem,
//   TextField,
//   Typography,
//   Divider,
//   Grid,
//   Box,
//   Button,
//   Collapse,
//   Card,
// } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import InputAdornment from "@mui/material/InputAdornment";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import EditIcon from "@mui/icons-material/Edit";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { ThemeProvider } from "@mui/material/styles";
// import { createTheme } from "./theme";
// const SIDE_NAV_WIDTH = 280;


// const LayoutRoot = styled.div`
//   display: flex;
//   flex: 1 1 auto;
//   margin-left: auto;
//   margin-right: 0;
//   max-width: 100%;
//   ${({ theme }) => `
//     @media (min-width: ${theme.breakpoints}px) {
//       padding-left: ${SIDE_NAV_WIDTH}px;
//     }
//   `}
// `;

// const LayoutContainer = styled.div`
//   display: flex;
//   flex: 1 1 auto;
//   flex-direction: column;
//   width: 100%;
// `;


// const Profile = () => {
//   const [profileData, setProfileData] = useState({
//     id: "",
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     address: "",
//     image: "",
//     gender: "",
//     birthDate:""
//   });
//   const [image, setImage] = useState("");
//   const [file, setFile] = useState(null);
//   const [file64String, setFile64String] = useState(null);
//   const [file64StringWithType, setFile64StringWithType] = useState(null);
//   const [ava, setAva] = useState(localStorage.getItem("Avata"));
//   const [isEditing, setIsEditing] = useState(false);
//   const [openPersonal, setOpenPersonal] = useState(true);
//   const [personalDisabled, setPersonalDisabled] = useState(true);
//   const { id } = useParams();
//   const handleLoginRedirect = () => {
//     window.location.href = "#/login";
//   };

//   const location = useLocation();
//   const [openNav, setOpenNav] = useState(false);

//   const handlePathnameChange = useCallback(() => {
//     if (openNav) {
//       setOpenNav(false);
//     }
//   }, [openNav]);

//   useEffect(() => {
//     handlePathnameChange();
//   }, [location.pathname, handlePathnameChange]);

//   useEffect(() => {
//     async function fetchProfileData() {
//       const res = await axios.get("http://171.238.155.142:8080/api/auth/user/" + id);
//       setProfileData(res.data);
//     }
//     fetchProfileData();
//   }, [id]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };
//   function onUploadFileChange(e) {
//     setFile64String(null);
//     if (e.target.files < 1 || !e.target.validity.valid) {
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setImage(reader.result);
//       }
//     };
//     reader.readAsDataURL(e.target.files[0]);
//     compressImageFile(e);
//   }

//   function fileToBase64(file, cb) {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//       cb(null, reader.result);
//     };
//     reader.onerror = function (error) {
//       cb(error, null);
//     };
//   }

//   async function compressImageFile(event) {
//     const imageFile = event.target.files[0];

//     const options = {
//       maxWidthOrHeight: 250,
//       useWebWorker: true,
//     };
//     try {
//       const compressedFile = await imageCompression(imageFile, options);

//       fileToBase64(compressedFile, (err, result) => {
//         if (result) {
//           setFile(result);
//           setFile64StringWithType(result);
//           setFile64String(String(result.split(",")[1]));
//         }
//       });
//     } catch (error) {
//       setFile64String(null);
//     }
//   }

//   const handleSaveClick = async () => {
//     try {
//       await axios.post("http://171.238.155.142:8080/api/auth/change", {
//         id: profileData.id,
//         firstName: profileData.firstName,
//         lastName: profileData.lastName,
//         phoneNumber: profileData.phoneNumber,
//         birthDate: profileData.birthDate,
//         gender: profileData.gender,
//         address: profileData.address,
//         image: file64StringWithType,
//       });
//       setIsEditing(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleOpenPersonal = () => {
//     setOpenPersonal((prev) => !prev);
//   };
// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   if (name === "birthDate") {
//     // Extract the value from the date object
//     const dateValue = value ? value.toISOString() : null;
//     setProfileData((prevData) => ({
//       ...prevData,
//       [name]: dateValue,
//     }));
//   } else if (name === "gender" && value === "") {
//     setProfileData((prevData) => ({
//       ...prevData,
//       [name]: "",
//     }));
//   } else {
//     setProfileData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   }
// };
  

//   return (
//     <div>
//       <ThemeProvider theme={createTheme()}>
//         <>
//           {/* <TopNav onNavOpen={() => setOpenNav(true)} onLoginRedirect={handleLoginRedirect} /> */}
//           <Header onLoginRedirect={handleLoginRedirect}></Header>
//           <SideNav onClose={() => setOpenNav(false)} open={openNav} />
//           <LayoutRoot>
//             <LayoutContainer>
//               <Card
//                 style={{ marginLeft: "auto", marginRight: 0, width: "80%" }}
//               >
//                 <Box sx={{ p: 0, pb: 1 }} dir="ltr">
//                   <Grid
//                     container
//                     columnSpacing={2}
//                     rowSpacing={2}
//                     direction="row"
//                     justifyContent="flex-end"
//                     alignItems="flex-end"
//                   ></Grid>
//                   <Grid
//                     container
//                     direction="rows"
//                     justifyContent="space-between"
//                   >
//                     <Grid item>
//                       <Button
//                         sx={{ mt: 2 }}
//                         variant="standard"
//                         endIcon={
//                           openPersonal ? (
//                             <KeyboardArrowUpIcon />
//                           ) : (
//                             <KeyboardArrowDownIcon />
//                           )
//                         }
//                         onClick={handleOpenPersonal}
//                       >
//                         <Typography variant="overline">Personal</Typography>
//                       </Button>
//                     </Grid>
//                     <Grid item>
//                       {openPersonal && (
//                         <>
//                           <Button
//                             variant="contained"
//                             sx={{ mt: 2, ml: 2 }}
//                             color="primary"
//                             endIcon={<EditIcon />}
//                             onClick={() => setPersonalDisabled((prev) => !prev)}
//                           >
//                             Edit
//                           </Button>
//                           {!personalDisabled && (
//                             <Button
//                               sx={{ mt: 2, ml: 2 }}
//                               variant="contained"
//                               color="primary"
//                               onClick={handleSaveClick}
//                             >
//                               Save
//                             </Button>
//                           )}
//                         </>
//                       )}
//                     </Grid>
//                   </Grid>
//                   <Collapse
//                     in={openPersonal}
//                     timeout="auto"
//                     unmountOnExit
//                     style={{ display: "flex" }}
//                   >
//                     <div className={styles.profile_image}>
//                       {image || profileData.image ? (
//                         <img
//                           src={image || profileData.image}
//                           alt="Profile"
//                           value={profileData.image}
//                         />
//                       ) : (
//                         <div className={styles.no_image}>No image selected</div>
//                       )}
//                       <input
//                         className="inside"
//                         type="file"
//                         accept=".jpg, .jpeg, .png"
//                         onChange={onUploadFileChange}
//                       />
//                     </div>
//                     <div>
//                       <Grid
//                         sx={{ p: 1, pb: 5, pt: 5 }}
//                         container
//                         columnSpacing={2}
//                         rowSpacing={2}
//                         direction="row"
//                         justifyContent="flex-start"
//                         alignItems="flex-start"
//                       >
//                         <Grid item xs={12} xl={4}>
//                           <TextField
//                             disabled={personalDisabled}
//                             variant="standard"
//                             style={{ width: "100%" }}
//                             size="small"
//                             name="email"
//                             // label="Email"
//                             value={profileData.email}
//                             onChange={handleInputChange}
//                           />
//                         </Grid>
//                         <Grid item xs={8} xl={4}>
//                           <TextField
//                             disabled={personalDisabled}
//                             variant="standard"
//                             style={{ width: "100%" }}
//                             size="small"
//                             label="First Name"
//                             name="firstName"
//                             value={profileData.firstName}
//                             onChange={handleInputChange}
//                           />
//                         </Grid>
//                         <Grid item xs={12} xl={4}>
//                           <TextField
//                             disabled={personalDisabled}
//                             variant="standard"
//                             style={{ width: "100%" }}
//                             size="small"
//                             name="lastName"
//                             label="Last Name"
//                             value={profileData.lastName}
//                             onChange={handleInputChange}
//                           />
//                         </Grid>
//                         <Grid item xs={12} xl={4}>
//                           <TextField
//                             disabled={personalDisabled}
//                             variant="standard"
//                             style={{ width: "100%" }}
//                             size="small"
//                             name="address"
//                             label="Address"
//                             value={profileData.address}
//                             onChange={handleInputChange}
//                           />
//                         </Grid>
//                         <Grid item xs={8} xl={4}>
//                           <TextField
//                             disabled={personalDisabled}
//                             variant="standard"
//                             style={{ width: "100%" }}
//                             size="small"
//                             name="phoneNumber"
//                             label="Phone Number"
//                             value={profileData.phoneNumber}
//                             onChange={handleInputChange}
//                           />
//                         </Grid>
//                         <Grid item xs={8} xl={4}>
//                           <TextField
//                             disabled={personalDisabled}
//                             style={{ width: "100%" }}
//                             variant="standard"
//                             value={profileData.gender}
//                             onChange={handleInputChange}
//                             select
//                             name="gender" // Update name attribute to "gender"
//                             label="Gender"
//                             size="small"
//                           >
//                             <MenuItem key="male" value="Male">
//                               Male
//                             </MenuItem>
//                             <MenuItem key="female" value="Female">
//                               Female
//                             </MenuItem>
//                           </TextField>
//                         </Grid>

//                         <Grid item xs={8} xl={4}>
//                           <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                               disabled={personalDisabled}
//                               variant="standard"
//                               inputFormat="dd/MM/yyyy"
//                               size="small"
//                               label="Date of Birth"
//                               name="birthDate" // Update name attribute to "birthDate"
//                               value={profileData.birthDate}
//                               renderInput={(params) => (
//                                 <TextField {...params} variant="standard" />
//                               )}
//                               onChange={(date) =>
//                                 handleInputChange({
//                                   target: { name: "birthDate", value: date },
//                                 })
//                               }
//                             />
//                           </LocalizationProvider>
//                         </Grid>
//                       </Grid>
//                     </div>
//                   </Collapse>
//                 </Box>
//               </Card>
//             </LayoutContainer>
//           </LayoutRoot>
//         </>
//       </ThemeProvider>
//     </div>
//   );
// };

// export default Profile;







import { Button, Modal, Form, Input, DatePicker, Select, message, Card, Typography } from "antd";
import { useState, useEffect, useRef } from "react";
import imageCompression from "browser-image-compression";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styles from "./styles/Profile.module.css";
import { useCallback } from "react";
import moment from 'moment'
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./theme";
import styled from "styled-components";
import Header from "./Header";
import { SideNav } from "../component/layouts/dashboard/side-nav";
import { backend } from "./utils/APIRoutes";

const SIDE_NAV_WIDTH = 280;


const LayoutRoot = styled.div`
  display: flex;
  flex: 1 1 auto;
  margin-left: 300px;
  
  max-width: 80%;
  ${({ theme }) => `
    @media (min-width: ${theme.breakpoints}px) {
      padding-left: ${SIDE_NAV_WIDTH}px;
    }
  `}
`;

const LayoutContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  width: 100%;
`;




const { Option } = Select;
export const Role = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const PayGrade = {
  INTERNSHIP: "INTERNSHIP",
  FRESHER: "FRESHER",
  JUNIOR: "JUNIOR",
  SENIOR: "SENIOR",
  VICEDIRECTOR: "VICEDIRECTOR",
  DIRECTOR: "DIRECTOR",
};
function Profile(){
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [file64String, setFile64String] = useState(null);
  const [file64StringWithType, setFile64StringWithType] = useState(null);
  const [ava, setAva] = useState(localStorage.getItem("Avata"));
  const [id, setId] = useState(localStorage.getItem("Id"));

  const [form] = Form.useForm();
  const handleLoginRedirect = () => {
    window.location.href = "#/login";
  };

  const location = useLocation();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(() => {
    handlePathnameChange();
  }, [location.pathname, handlePathnameChange]);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function fetchProfileData() {
      const res = await axios.get(
        `${process.env.REACT_APP_BACK_END}/api/auth/user/` + id
      );
      const userData = res.data;
      setUserData(userData);
      // setMst(userData.mst)
      form.setFieldsValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        birthDate: moment(userData.birthDate, "YYYY-MM-DD"),
        email: userData.email,
        address: userData.address,
        phoneNumber: userData.phoneNumber,
        gender: userData.gender,
        // image: userData.image
      });
    }
    fetchProfileData();
  }, [id, form]);

  function onUploadFileChange(e) {
    setFile64String(null);
    if (e.target.files < 1 || !e.target.validity.valid) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    compressImageFile(e);
  }

  function fileToBase64(file, cb) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  }

  async function compressImageFile(event) {
    const imageFile = event.target.files[0];

    const options = {
      maxWidthOrHeight: 250,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);

      fileToBase64(compressedFile, (err, result) => {
        if (result) {
          setFile(result);
          setFile64StringWithType(result);
          setFile64String(String(result.split(",")[1]));
        }
      });
    } catch (error) {
      setFile64String(null);
    }
  }

  // const handleSave = async () => {
  //   try {
  //     await form.validateFields();
  //     const formData = {
  //       id: id,
  //       image: file64StringWithType,
  //       ...form.getFieldsValue(),
  //     };
  //     await axios.post(`${process.env.REACT_APP_BACK_END}/api/auth/change`, formData);

  //     // localStorage.setItem("Email", form.getFieldValue("email"));
  //     // localStorage.setItem("FirstName", form.getFieldValue("firstName"));
  //     // localStorage.setItem("LastName", form.getFieldValue("astName"));
  //     // localStorage.setItem("Gender", form.getFieldValue("gender"));
  //     // localStorage.setItem("Address", form.getFieldValue("address"));
  //     // localStorage.setItem("PhoneNumber", form.getFieldValue("phoneNumber"));
  //     // localStorage.setItem("isAvatarImageSet", true);
  //     // localStorage.setItem("UserAvata", form.getFieldValue("image"));

  //     // if (form.getFieldValue("image") != null) {
  //     //   localStorage.setItem("Avata", form.getFieldValue("image"));
  //     // } else {
  //     //   localStorage.setItem("Avata", "");
  //     // }

  //     // localStorage.setItem("chat-app-current-user", JSON.stringify(formData));

  //     message.success("OKKK");
  //   } catch (error) {
  //     message.error("KO OKKK");
  //     console.log(error)
  //   }
  // };

  const handleSave = async () => {
    try {
      await form.validateFields();
      const formValues = form.getFieldsValue();
      const updatedFormData = {
        id: id,
        image: file64StringWithType,
        ...formValues,
        birthDate: formValues.birthDate.format("YYYY-MM-DD"),
      };

      await axios.post(
        `${process.env.REACT_APP_BACK_END}/api/auth/change`,
        updatedFormData
      );

          localStorage.setItem("Email", updatedFormData.getFieldValue("email"));
          localStorage.setItem("FirstName", updatedFormData.getFieldValue("firstName"));
          localStorage.setItem("LastName", updatedFormData.getFieldValue("astName"));
          localStorage.setItem("Gender", updatedFormData.getFieldValue("gender"));
          localStorage.setItem("Address", updatedFormData.getFieldValue("address"));
          localStorage.setItem("PhoneNumber", updatedFormData.getFieldValue("phoneNumber"));
          localStorage.setItem("isAvatarImageSet", true);
          localStorage.setItem("UserAvata", updatedFormData.getFieldValue("image"));

          if (updatedFormData.getFieldValue("image") != null) {
            localStorage.setItem("Avata", updatedFormData.getFieldValue("image"));
          } else {
            localStorage.setItem("Avata", "");
          }

          localStorage.setItem(
            "chat-app-current-user",
            JSON.stringify(updatedFormData)
          );

      message.success("OKKK");
    } catch (error) {
      message.error("KO OKKK");
    }
  };
  const [hours, setHours] = useState(0);

  useEffect(() =>{
    async function hours(){
    const res = await axios.get(
      `${process.env.REACT_APP_BACK_END}/api/attendance/total-hours-worked/`+ id
    );
    setHours(res.data)
  }
    hours()
  },[id])

  const [isExpanded, setIsExpanded] = useState(true);
  // ... other state and functions

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <ThemeProvider theme={createTheme()}>
        <>
          {/* <TopNav onNavOpen={() => setOpenNav(true)} onLoginRedirect={handleLoginRedirect} /> */}
          <Header onLoginRedirect={handleLoginRedirect}></Header>
          <SideNav onClose={() => setOpenNav(false)} open={openNav} />
          <LayoutRoot>
            <LayoutContainer>
              <Card
              // title="Profile"
              // style={{ width: "100%", marginTop: "20px" }}
              // onClick={handleCardClick}
              >
                <h2 style={{ width: "100%" }} onClick={handleCardClick}>
                  Tài khoản
                </h2>
                <h3>Tổng thời gian làm trong tháng: {hours} giờ</h3>
                {isExpanded && (
                  <Form
                    form={form}
                    autoComplete="off"
                    style={{ marginLeft: 0 }}
                  >
                    <div>
                      <Form.Item
                        label="Tên"
                        name="firstName"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        style={{ marginLeft: "20px", textAlign: "center" }}
                        labelCol={{ span: 6 }}
                        labelAlign="left"
                        wrapperCol={{ span: 18 }}
                      >
                        <Input
                          style={{ width: "300px", textAlign: "center" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Họ"
                        name="lastName"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        style={{ marginLeft: "20px", textAlign: "center" }}
                        labelCol={{ span: 6 }}
                        labelAlign="left"
                        wrapperCol={{ span: 18 }}
                      >
                        <Input
                          style={{ width: "300px", textAlign: "center" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        style={{ marginLeft: "20px", textAlign: "center" }}
                        labelCol={{ span: 6 }}
                        labelAlign="left"
                        wrapperCol={{ span: 18 }}
                      >
                        <Input
                          style={{ width: "300px", textAlign: "center" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        style={{ marginLeft: "20px", textAlign: "center" }}
                        labelCol={{ span: 6 }}
                        labelAlign="left"
                        wrapperCol={{ span: 18 }}
                      >
                        <Input
                          style={{ width: "300px", textAlign: "center" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="SĐT"
                        name="phoneNumber"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        style={{ marginLeft: "20px", textAlign: "center" }}
                        labelCol={{ span: 6 }}
                        labelAlign="left"
                        wrapperCol={{ span: 18 }}
                      >
                        <Input
                          style={{ width: "300px", textAlign: "center" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Ngày sinh"
                        name="birthDate"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        style={{ marginLeft: "20px", textAlign: "center" }}
                        labelCol={{ span: 6 }}
                        labelAlign="left"
                        wrapperCol={{ span: 18 }}
                      >
                        <DatePicker
                          style={{ width: "300px", textAlign: "center" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Giới tính"
                        name="gender"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        style={{ marginLeft: "20px", textAlign: "center" }}
                        labelCol={{ span: 6 }}
                        labelAlign="left"
                        wrapperCol={{ span: 18 }}
                      >
                        <Select style={{ width: "300px", textAlign: "center" }}>
                          <Option value="Male">Male</Option>
                          <Option value="Female">Female</Option>
                        </Select>
                      </Form.Item>

                      {/* <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={onUploadFileChange}
            />
          </Form.Item> */}
                      <div className={styles.profile_image}>
                        {image || userData.image ? (
                          <img
                            src={image || userData.image}
                            alt="Profile"
                            value={userData.image}
                          />
                        ) : (
                          <div className={styles.no_image}>
                            No image selected
                          </div>
                        )}
                        <input
                          className="inside"
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={onUploadFileChange}
                        />
                      </div>
                    </div>

                    <Button
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        marginTop: "20px",
                        marginLeft: "auto",
                        marginRight: 0,
                      }}
                      type="primary"
                      onClick={handleSave}
                    >
                      Lưu
                    </Button>
                  </Form>
                )}
              </Card>
            </LayoutContainer>
          </LayoutRoot>
        </>
      </ThemeProvider>
    </>
  );
}
export default Profile;