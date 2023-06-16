import React, { useState, useEffect } from "react";
import styles from "./styles/Profile.module.css";
import imageCompression from "browser-image-compression";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Header from "./Header";
import {
  MenuItem,
  TextField,
  Typography,
  Divider,
  Grid,
  Box,
  Button,
  Collapse,
  Card,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InputAdornment from "@mui/material/InputAdornment";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import EditIcon from "@mui/icons-material/Edit";
import LocalizationProvider from "@mui/lab/LocalizationProvider/";
import DatePicker from "@mui/lab/DatePicker";

// const Profile = () => {
//   const { id } = useParams();

//   const [openPersonal, setOpenPersonal] = useState(true);
//   const [personalDisabled, setPersonalDisabled] = useState(true);
//   const [image, setImage] = useState("");
//   const [file, setFile] = useState(null);
//   const [file64String, setFile64String] = useState(null);
//   const [file64StringWithType, setFile64StringWithType] = useState(null);
//   const [ava, setAva] = useState(localStorage.getItem("Avata"));

//   const schema = yup.object().shape({
//     email: yup.string().email().required(),
//     lastName: yup.string(),
//     firstName: yup.string(),
//     address: yup.string(),
//     gender: yup.string(),
//     phoneNumber: yup.string(),
//   });

//   const [data, setData] = useState([]);
//       const EditButtonStyles = {
//         mt: 2,
//         bgcolor: "grey.200",
//         border: "2px solid",
//         boxShadow: "none",
//         // color: postalDisabled || personalDisabled ? "#abb2b9" : "black",
//         color: "#abb2b9",
//         "&:hover": {
//           backgroundColor: "#e6ebf0",
//           color: "#4782da",
//         },
//       };

//       const DisabledTextBox = {
//         "& .Mui-disabled": {
//           opacity: 0.8,
//           "-webkit-text-fill-color": "black",
//         },
//       };

//   const handleOpenPersonal = () => {
//     setOpenPersonal((prev) => !prev);
//   };

//   // const handleInputChange = (e) => {
//   //   const name = e.target.name;
//   //   const value = e.target.value;

//   //   setInfo((prevInfo) => ({
//   //     ...prevInfo,
//   //     [name]: value,
//   //   }));
//   // };

//   useEffect(() => {
//     async function prof() {
//       const res = await axios.get("/api/auth/user/" + id);
//       setData(res.data);
//     }
//     prof();
//   }, []);

//   async function save(inputData) {
//     try {
//       const response = await axios.post("/api/auth/user/change", {
//         id: data.id,
//         firstName: inputData.firstName,
//         lastName: inputData.lastName,
//         avata: file64StringWithType,
//         phoneNumber: inputData.phoneNumber,
//         address: inputData.address,
//         gender: inputData.gender,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

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

//   return (
//     <div className={styles.container}>
//       <Header />
//       <Formik
//         validationSchema={schema}
//         initialValues={{
//           email: data.email,
//           firstName: data.firstName,
//           lastName: data.lastName,
//           address: data.address,
//           phoneNumber: data.phoneNumber,
//           gender: data.gender,
//         }}
//         onSubmit={(values, { setSubmitting }) => {
//           save(values);
//           setSubmitting(false);
//         }}
//       >
//         {({
//           handleSubmit,
//           handleChange,
//           handleBlur,
//           values,
//           touched,
//           isInValid,
//           errors,
//         }) => (
//           <Form
//             noValidate
//             onSubmit={handleSubmit}
//             className={styles.profile_container}
//           >
//             <Card style={{ width: "80%" }}>
//               <Box sx={{ p: 0, pb: 1 }} dir="ltr">
//                 <Grid
//                   container
//                   columnSpacing={2}
//                   rowSpacing={2}
//                   direction="row"
//                   justifyContent="flex-end"
//                   alignItems="flex-end"
//                 ></Grid>
//                 <Grid container direction="rows" justifyContent="space-between">
//                   <Grid item>
//                     <Button
//                       sx={{ mt: 2 }}
//                       variant="standard"
//                       endIcon={
//                         openPersonal ? (
//                           <KeyboardArrowUpIcon />
//                         ) : (
//                           <KeyboardArrowDownIcon />
//                         )
//                       }
//                       onClick={handleOpenPersonal}
//                     >
//                       <Typography variant="overline">Personal</Typography>
//                     </Button>
//                   </Grid>
//                   <Grid item>
//                     {openPersonal && (
//                       <>
//                         <Button
//                           sx={EditButtonStyles}
//                           variant="contained"
//                           color="primary"
//                           endIcon={<EditIcon />}
//                           onClick={() => setPersonalDisabled((prev) => !prev)}
//                         >
//                           Edit
//                         </Button>
//                         {!personalDisabled && (
//                           <Button
//                             sx={{ mt: 2, ml: 2 }}
//                             variant="contained"
//                             color="primary"
//                             type="submit"
//                           >
//                             Save
//                           </Button>
//                         )}
//                       </>
//                     )}
//                   </Grid>
//                 </Grid>
//                 <Collapse
//                   in={openPersonal}
//                   timeout="auto"
//                   unmountOnExit
//                   style={{ display: "flex" }}
//                 >
//                   <div className={styles.profile_image}>
//                     {image || data.image ? (
//                       <img
//                         src={image || data.image}
//                         alt="Profile"
//                         value={data.image}
//                       />
//                     ) : (
//                       <div className={styles.no_image}>No image selected</div>
//                     )}
//                     <input
//                       className="inside"
//                       type="file"
//                       accept=".jpg, .jpeg, .png"
//                       onChange={onUploadFileChange}
//                     />
//                   </div>
//                   <div>
//                     <Grid
//                       sx={{ p: 1, pb: 5, pt: 5 }}
//                       container
//                       columnSpacing={2}
//                       rowSpacing={2}
//                       direction="row"
//                       justifyContent="flex-start"
//                       alignItems="flex-start"
//                     >
//                       <Grid item xs={8} xl={4}>
//                         <Form.Control
//                           type="text"
//                           name="email"
//                           value={values.email}
//                           onChange={handleChange}
//                         />
//                       </Grid>
//                       <Grid item xs={8} xl={4}>
//                         <Form.Control
//                           type="text"
//                           name="firstName"
//                           value={values.firstName}
//                           onChange={handleChange}
//                         />
//                       </Grid>
//                       <Grid item xs={12} xl={4}>
//                         <Form.Control
//                           type="text"
//                           name="lastName"
//                           value={values.lastName}
//                           onChange={handleChange}
//                         />
//                       </Grid>
//                       <Grid item xs={12} xl={4}>
//                         <Form.Control
//                           type="text"
//                           name="address"
//                           value={values.address}
//                           onChange={handleChange}
//                         />
//                       </Grid>
//                       <Grid item xs={8} xl={4}>
//                         <Form.Control
//                           type="text"
//                           name="phoneNumber"
//                           value={values.phoneNumber}
//                           onChange={handleChange}
//                         />
//                       </Grid>
//                       {/* <Grid item xs={7} xl={3}>
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
//                     </Grid>
//                   </div>
//                 </Collapse>
//               </Box>
//             </Card>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default Profile;

// import React, { useState } from "react";
// import { Card, Box, Grid, Button, Typography, TextField } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import { useParams } from "react-router-dom";
// import Header from "./Header";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Typography, TextField, Button } from "@mui/material";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    image: "",
    gender: "",
  });
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [file64String, setFile64String] = useState(null);
  const [file64StringWithType, setFile64StringWithType] = useState(null);
  const [ava, setAva] = useState(localStorage.getItem("Avata"));
  const [isEditing, setIsEditing] = useState(false);
  const [openPersonal, setOpenPersonal] = useState(true);
  const [personalDisabled, setPersonalDisabled] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProfileData() {
      const res = await axios.get("/api/auth/user/" + id);
      setProfileData(res.data);
    }
    fetchProfileData();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };
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

  const handleSaveClick = async () => {
    try {
      await axios.post("/api/auth/change", {
        id: profileData.id,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address,
        image: file64StringWithType,
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenPersonal = () => {
    setOpenPersonal((prev) => !prev);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Header></Header>
      {/* <Typography>{profileData.firstName}</Typography>
      <Typography>{profileData.lastName}</Typography>
      <Typography>{profileData.phoneNumber}</Typography>
      <Typography>{profileData.id}</Typography>

      <Button onClick={handleEditClick}>Edit</Button>
      {isEditing && (
        <div>
          <TextField
            name="firstName"
            value={profileData.firstName}
            onChange={handleInputChange}
          />
          <TextField
            name="lastName"
            value={profileData.lastName}
            onChange={handleInputChange}
          />
          <TextField
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleInputChange}
          />
          <Button onClick={handleSaveClick}>Save</Button>
        </div>
      )} */}
     <Card style={{ width: "80%" , marginTop:"70px"}}>
               <Box sx={{ p: 0, pb: 1 }} dir="ltr">
                 <Grid
                  container
                  columnSpacing={2}
                  rowSpacing={2}
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                ></Grid>
                <Grid container direction="rows" justifyContent="space-between">
            <Grid item>
              <Button
                sx={{ mt: 2 }}
                variant="standard"
                endIcon={
                  openPersonal ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
                onClick={handleOpenPersonal}
              >
                <Typography variant="overline">Personal</Typography>
              </Button>
            </Grid>
            <Grid item>
              {openPersonal && (
                <>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, ml: 2 }}
                    color="primary"
                    endIcon={<EditIcon />}
                    onClick={() => setPersonalDisabled((prev) => !prev)}
                  >
                    Edit
                  </Button>
                  {!personalDisabled && (
                    <Button
                      sx={{ mt: 2, ml: 2 }}
                      variant="contained"
                      color="primary"
                      onClick={handleSaveClick}
                    >
                      Save
                    </Button>
                  )}
                </>
              )}
            </Grid>
          </Grid>
          <Collapse
            in={openPersonal}
            timeout="auto"
            unmountOnExit
            style={{ display: "flex" }}
          >
            <div className={styles.profile_image}>
              {image || profileData.image ? (
                <img
                  src={image || profileData.image}
                  alt="Profile"
                  value={profileData.image}
                />
              ) : (
                <div className={styles.no_image}>No image selected</div>
              )}
              <input
                className="inside"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={onUploadFileChange}
              />
            </div>
            <div>
              <Grid
                sx={{ p: 1, pb: 5, pt: 5 }}
                container
                columnSpacing={2}
                rowSpacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={12} xl={4}>
                  <TextField
                    disabled={personalDisabled}
                    variant="standard"
                    style={{ width: "100%" }}
                    size="small"
                    name="email"
                    label="Email"
                    value={profileData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={8} xl={4}>
                  <TextField
                    disabled={personalDisabled}
                    variant="standard"
                    style={{ width: "100%" }}
                    size="small"
                    label="First Name"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} xl={4}>
                  <TextField
                    disabled={personalDisabled}
                    variant="standard"
                    style={{ width: "100%" }}
                    size="small"
                    name="lastName"
                    label="Last Name"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} xl={4}>
                  <TextField
                    disabled={personalDisabled}
                    variant="standard"
                    style={{ width: "100%" }}
                    size="small"
                    name="address"
                    label="Address"
                    value={profileData.address}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={8} xl={4}>
                  <TextField
                    disabled={personalDisabled}
                    variant="standard"
                    style={{ width: "100%" }}
                    size="small"
                    name="phoneNumber"
                    label="Phone Number"
                    value={profileData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </Grid>
                {/* <Grid item xs={7} xl={3}>
                        <TextField
                          disabled={personalDisabled}
                          style={{ width: "100%" }}
                          variant="standard"
                          value={values.gender}
                          onChange={handleChange}
                          select
                          name="Gender"
                          label="Gender"
                          size="small"
                          sx={DisabledTextBox}
                        >
                          <MenuItem key={"Male"} value="Male">
                            Male
                          </MenuItem>
                          <MenuItem key={"Female"} value="Female">
                            Female
                          </MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={8} xl={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            sx={DisabledTextBox}
                            disabled={personalDisabled}
                            variant="standard"
                            size="small"
                            label="Date of Birth"
                            name="birthDate"
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                sx={DisabledTextBox}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid> */}
              </Grid>
            </div>
          </Collapse>
        </Box>
      </Card>
    </div>
  );
};

export default Profile;

