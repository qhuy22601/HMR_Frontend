import React, { useState } from "react";
import styles from "./styles/Profile.module.css";
import imageCompression from "browser-image-compression";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import bcrypt from "bcryptjs";


const Profile = () => {
  const [name, setName] = useState(localStorage.getItem("UserName"));
  const [email, setEmail] = useState(localStorage.getItem("Email"));
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem("PhoneNumber"));
  const [address, setAddress] = useState(localStorage.getItem("Address"));
  const [password, setPassword] = useState(sessionStorage.getItem("Password"));
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [file64String, setFile64String] = useState(null);
  const [file64StringWithType, setFile64StringWithType] = useState(null);
  const [ava, setAva] = useState(localStorage.getItem("Avata"))

  const schema = yup.object().shape({
    password: yup.string().required(),
    username: yup.string().required(),
    image: yup.string(),
    address: yup.string(),
    phoneNumber: yup.string(),
  });


  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const toggleNameEdit = () => {
    setIsEditingName(!isEditingName);
  };
  const togglePhoneNumberEdit = () => {
    setIsEditingPhoneNumber(!isEditingPhoneNumber);
  };
  const toggleAddressEdit = () => {
    setIsEditingAddress(!isEditingAddress);
  };

  const toggleEmailEdit = () => {
    setIsEditingEmail(!isEditingEmail);
  };
   const togglePasswordEdit = () => {
     setIsEditingPassword(!isEditingPassword);
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
      // input file is compressed in compressedFile, now write further logic here

      fileToBase64(compressedFile, (err, result) => {
        if (result) {
          setFile(result);
          //   console.log(file);
          //   console.log(String(result.split(",")[1]));
          setFile64StringWithType(result);
          setFile64String(String(result.split(",")[1]));
        }
      });
    } catch (error) {
      setFile64String(null);
      // console.log(error);
    }
  }

  async function change(inputData) {
    const response = await axios({
      method: "post",
      url: "/api/auth/change",
      data: {
        id: localStorage.getItem("Id"),
        username: inputData.username,
        password: inputData.password,
        image: file64StringWithType,
        phoneNumber: inputData.phoneNumber,
        address: inputData.address,
      },
      headers:{
        Authorization: localStorage.getItem("Token")
      }
    });
    if (response.data !== null && response.data.status === "Fail") {
      console.log(response.data.status);
    }
    if (response.data !== null && response.data.status === "Success") {
      localStorage.setItem("UserName", response.data.payload.username);
      localStorage.setItem("Email", response.data.payload.email);
      localStorage.setItem("Address", response.data.payload.address);
      localStorage.setItem("PhoneNumber", response.data.payload.phoneNumber);
      localStorage.setItem("Avata", response.data.payload.image);
      sessionStorage.setItem("Password", response.data.payload.password)

      console.log(response.data.status);

    }
  }

  return (
    <div className={styles.profile_container}>
      <Formik
        validationSchema={schema}
        initialValues={{
          password: password,
          username: name,
          address: address,
          phoneNumber: phoneNumber,
          image: ava,
        }}
        onSubmit={(values, { setSubmitting }) => {
          change(values);
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInValid,
          errors,
        }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className={styles.profile_container}
          >
            <div className={styles.profile_image}>
              {image || ava ? (
                <img src={image || ava} alt="Profile" value={ava} />
              ) : (
                <div className={styles.no_image}>No image selected</div>
              )}
              <input
                className="inside"
                // value={values.image}
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={onUploadFileChange}
              />
            </div>
            <div className={styles.profile_info}>
              <div className={styles.profile_name}>
                {isEditingName ? (
                  <Form.Control
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={toggleNameEdit}
                    autoFocus
                  />
                ) : (
                  <p onClick={toggleNameEdit} value={name}>
                    {name}
                  </p>
                )}
              </div>
              <div className={styles.profile_email}>
                <div style={{ display: "flex" }}>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    email
                  </label>
                  <p onClick={toggleEmailEdit}>{email}</p>
                </div>
              </div>
              <div className={styles.profile_email}>
                {isEditingPhoneNumber ? (
                  <input
                    type="text"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={togglePhoneNumberEdit}
                    autoFocus
                  />
                ) : (
                  <div style={{ display: "flex" }}>
                    <label style={{ display: "flex", alignItems: "center" }}>
                      Phone Number
                    </label>
                    <p onClick={togglePhoneNumberEdit} value={phoneNumber}>
                      {phoneNumber}
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.profile_email}>
                {isEditingAddress ? (
                  <input
                    type="text"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={toggleAddressEdit}
                    autoFocus
                  />
                ) : (
                  <div style={{ display: "flex" }}>
                    <label style={{ display: "flex", alignItems: "center" }}>
                      Address
                    </label>
                    <p onClick={toggleAddressEdit} value={address}>
                      {address}
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.profile_email}>
                {isEditingPassword ? (
                  <input
                    type="text"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={togglePasswordEdit}
                    autoFocus
                  />
                ) : (
                  <div style={{ display: "flex" }}>
                    <label style={{ display: "flex", alignItems: "center" }}>
                      Password:
                    </label>
                    <p onClick={togglePasswordEdit} value={password}>
                      Password
                    </p>
                  </div>
                )}
              </div>
              <Button variant="contained" type="submit">
                Change
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
