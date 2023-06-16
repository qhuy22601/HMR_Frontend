import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { SideNav } from "../component/layouts/dashboard/side-nav";
import { TopNav } from "../component/layouts/dashboard/top-nav";
import axios from "axios";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Collapse,
  TextField,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./theme";
import imageCompression from "browser-image-compression";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./styles/Profile.module.css";
import Header from "./Header";
const SIDE_NAV_WIDTH = 280;



const LayoutRoot = styled.div`
  display: flex;
  flex: 1 1 auto;
  margin-left:auto;
  margin-right:0;
  max-width: 100%;
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

function Account() {
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
  const [id, setId] = useState(localStorage.getItem("Id"));

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

      localStorage.setItem("Email", profileData.email);
      localStorage.setItem("Id", profileData.id);
      localStorage.setItem(
        "FirstName",
        profileData.firstName
      );
      localStorage.setItem(
        "LastName",
        profileData.lastName
      );
      localStorage.setItem("Gender", profileData.gender);
      localStorage.setItem("Address", profileData.address);
      localStorage.setItem(
        "PhoneNumber",
        profileData.phoneNumber
      );
      localStorage.setItem("isAvatarImageSet", true);
      localStorage.setItem("UserAvata", profileData.image);

      if (profileData.image != null) {
        localStorage.setItem("Avata", profileData.image);
      } else {
        localStorage.setItem("Avata", "");
      }
      sessionStorage.setItem(
        "Password",
        profileData.password
      );
      localStorage.setItem(
        "chat-app-current-user",
        JSON.stringify(profileData)
      );

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
    <ThemeProvider theme={createTheme()}>
      <>
        {/* <TopNav onNavOpen={() => setOpenNav(true)} onLoginRedirect={handleLoginRedirect} /> */}
        <Header onLoginRedirect={handleLoginRedirect}></Header>
        <SideNav onClose={() => setOpenNav(false)} open={openNav} />
        <LayoutRoot>
          <LayoutContainer>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                py: 8,
              }}
            >
              <Container maxWidth="lg">
                <Stack spacing={3}>
                  <div>
                    <Typography variant="h4">Account</Typography>
                  </div>
                  <Card style={{ width: "80%", marginTop: "70px" }}>
                    <Box sx={{ p: 0, pb: 1 }} dir="ltr">
                      <Grid
                        container
                        columnSpacing={2}
                        rowSpacing={2}
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                      ></Grid>
                      <Grid
                        container
                        direction="rows"
                        justifyContent="space-between"
                      >
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
                                onClick={() =>
                                  setPersonalDisabled((prev) => !prev)
                                }
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
                            <Grid item xs={8} xl={4}>
                              <TextField
                                disabled={personalDisabled}
                                variant="standard"
                                style={{ width: "100%" }}
                                size="small"
                                type="email"
                             
                                name="email"
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
                </Stack>
              </Container>
            </Box>
          </LayoutContainer>
        </LayoutRoot>
      </>
    </ThemeProvider>
  );
}

export default Account;
