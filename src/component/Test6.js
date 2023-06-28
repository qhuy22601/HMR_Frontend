// function Test6() {
//   const handleImageUpload = (event) => {
//     const formData = new FormData();
//     const files = event.target.files;

//     for (let i = 0; i < files.length; i++) {
//       formData.append("images", files[i]);
//     }

//     fetch("http://localhost:8000/api/upload_image/", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.message);
//         // Handle the response from the server
//       })
//       .catch((error) => {
//         console.log("Error:", error);
//       });
//   };

//   // Render the input file field with multiple attribute
//   return <input type="file" multiple onChange={handleImageUpload} />;
// }

// export default Test6;


// import React, { useState } from 'react';

// const Test6 = () => {
//   const [success, setSuccess] = useState(null);

//   const handleImageUpload = (event) => {
//     const formData = new FormData();
//     formData.append("image", event.target.files[0]);

//     fetch("http://localhost:8000/api/upload_image/", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         setSuccess(data.success);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleImageUpload} />
//       {success !== null && (
//         <div>{success ? "Check-in successful" : "Check-in failed"}</div>
//       )}
//     </div>
//   );
// };

// export default Test6;

// import React, { useRef, useState } from "react";

// function CameraCapture() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [imageData, setImageData] = useState(null);

//   const startCamera = () => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//       })
//       .catch((error) => {
//         console.error("Error accessing camera:", error);
//       });
//   };

//   const stopCamera = () => {
//     const stream = videoRef.current.srcObject;
//     const tracks = stream.getTracks();
//     tracks.forEach((track) => {
//       track.stop();
//     });
//     videoRef.current.srcObject = null;
//   };

//   const captureImage = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     const imageData = canvas.toDataURL("image/jpeg");
//     setImageData(imageData);
//   };

//   const uploadImage = () => {
//     if (imageData) {
//       const formData = new FormData();
//       formData.append("image", dataURItoBlob(imageData));

//       fetch("http://localhost:8000/api/upload_image/", {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log(data.message);
//           // Handle the response from the server
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//           // Handle any errors
//         });
//     }
//   };

//   const dataURItoBlob = (dataURI) => {
//     const byteString = atob(dataURI.split(",")[1]);
//     const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ab], { type: mimeString });
//   };

//   return (
//     <div>
//       <video ref={videoRef} width="400" height="300" />
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//       {!imageData && (
//         <div>
//           <button onClick={startCamera}>Start Camera</button>
//           <button onClick={stopCamera}>Stop Camera</button>
//           <button onClick={captureImage}>Capture Image</button>
//         </div>
//       )}
//       {imageData && (
//         <div>
//           <img src={imageData} alt="Captured" width="400" height="300" />
//           <button onClick={uploadImage}>Upload Image</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CameraCapture;
// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [image, setImage] = useState(null);
//   const [user_id, setUserId] = useState("");
//   const [message, setMessage] = useState("");

//   const handleImageUpload = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleUserIdChange = (e) => {
//     setUserId(e.target.value);
//   };

//   const handleImageSubmit = async () => {
//     if (!image || !user_id) {
//       setMessage("Please select an image and enter user ID.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("user_id", user_id);

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/upload_image/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.data.message) {
//         setMessage(response.data.message);
//       } else if (response.data.error) {
//         setMessage(response.data.error);
//       }
//     } catch (error) {
//       setMessage("Error occurred during image upload.");
//     }
//   };

//   const handleCheckIn = async () => {
//     if (!user_id) {
//       setMessage("Please enter user ID.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8000/check_in/", {
//         user_id: user_id,
//       });

//       if (response.data.success) {
//         setMessage(response.data.message);
//       } else {
//         setMessage("Check-in failed.");
//       }
//     } catch (error) {
//       setMessage("Error occurred during check-in.");
//     }
//   };

//   return (
//     <div>
//       <h1>Attendance System</h1>
//       <div>
//         <h2>Upload Image</h2>
//         <input type="file" onChange={handleImageUpload} />
//         <br />
//         <input
//           type="text"
//           placeholder="User ID"
//           onChange={handleUserIdChange}
//         />
//         <br />
//         <button onClick={handleImageSubmit}>Submit</button>
//       </div>
//       <div>
//         <h2>Check-in</h2>
//         <input
//           type="text"
//           placeholder="User ID"
//           onChange={handleUserIdChange}
//         />
//         <br />
//         <button onClick={handleCheckIn}>Check-in</button>
//       </div>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default App;


///////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState, useRef } from "react";

// const CheckInForm = () => {
//   const [imageData, setImageData] = useState(null);
//   const videoRef = useRef(null);

//   const handleStartCamera = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//       })
//       .catch((error) => {
//         console.error("Error accessing camera:", error);
//       });
//   };

//   const handleCaptureImage = () => {
//     const video = videoRef.current;
//     const canvas = document.createElement("canvas");
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataUrl = canvas.toDataURL("image/jpeg");
//     setImageData(dataUrl);
//   };

//   const handleCheckIn = () => {
//     if (imageData) {
//       const formData = new FormData();
//       formData.append("image", dataURItoBlob(imageData));

//       fetch("http://localhost:8000/api/check_in/", {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => {
//           if (response.ok) {
//             console.log("Check-in successful");
//           } else {
//             console.log("Check-in failed");
//           }
//         })
//         .catch((error) => {
//           console.error("Error during check-in:", error);
//         });
//     }
//   };

//   const dataURItoBlob = (dataURI) => {
//     const byteString = atob(dataURI.split(",")[1]);
//     const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ab], { type: mimeString });
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={handleStartCamera}>Start Camera</button>
//       </div>
//       <div>
//         <video ref={videoRef} autoPlay />
//       </div>
//       <div>
//         <button onClick={handleCaptureImage}>Capture Image</button>
//       </div>
//       <div>{imageData && <img src={imageData} alt="Captured Image" />}</div>
//       <div>
//         <button onClick={handleCheckIn}>Check In</button>
//       </div>
//     </div>
//   );
// };

// export default CheckInForm;
/////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";

// const ImageUploader = () => {
//   const [selectedImages, setSelectedImages] = useState([]);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedImages(files);
//   };

//   const handleUpload = () => {
//     const formData = new FormData();
//     selectedImages.forEach((image) => {
//       formData.append("images", image);
//     });

//     fetch("http://localhost:8000/api/upload_images/", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.message);
//         // Handle success or display a success message
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         // Handle error or display an error message
//       });
//   };

//   return (
//     <div>
//       <input type="file" multiple onChange={handleImageChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default ImageUploader;


// import React, { useState, useRef, useEffect } from "react";
// import { Button, Input, Typography } from "antd";
// import Webcam from "react-webcam";
// import axios from "axios";

// const { Title } = Typography;

// const CameraCapture = () => {
//   const webcamRef = useRef(null);
//   const [id, setId] = useState("");
//   const [count, setCount] = useState(1);
//   const [capturing, setCapturing] = useState(false);

//   const captureImage = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     const imageName = `User.${id}.${count}.jpg`;

//     // Convert imageSrc to a Blob object
//     const blob = await fetch(imageSrc).then((res) => res.blob());

//     // Create FormData and add the image data and file name
//     const formData = new FormData();
//     formData.append("images", blob, imageName);

//     try {
//       // Send the captured image data to the backend
//       await axios.post(`${process.env.REACT_APP_AI}/api/capture/`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setCount((prevCount) => prevCount + 1);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (capturing && count <= 100) {
//       captureImage();
//     }
//   }, [count, capturing]);

//   const startCapturing = () => {
//     setCapturing(true);
//   };

//   const stopCapturing = () => {
//     setCapturing(false);
//   };

//   return (
//     <div>
//       <div>
//         <Title level={4}>ID:</Title>
//         <Input value={id} onChange={(e) => setId(e.target.value)} required />
//       </div>
//       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
//       {count < 100 ? (
//         <Button type="primary" onClick={startCapturing}>
//           Start Capturing
//         </Button>
//       ) : (
//         <Button type="primary" onClick={stopCapturing} disabled={!capturing}>
//           Stop Capturing
//         </Button>
//       )}
//       <p>{count} images captured</p>
//     </div>
//   );
// };

// export default CameraCapture;
import React, { useState, useRef, useEffect,useCallback } from "react";
import { Button, Input, Typography } from "antd";
import { useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";
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

const { Title } = Typography;

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [id, setId] = useState("");
  const [count, setCount] = useState(1);
  const [capturing, setCapturing] = useState(false);

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageName = `User.${id}.${count}.jpg`;

    // Convert imageSrc to a Blob object
    const blob = await fetch(imageSrc).then((res) => res.blob());

    // Create FormData and add the image data and file name
    const formData = new FormData();
    formData.append("images", blob, imageName);

    try {
      // Send the captured image data to the backend
      await axios.post(`${process.env.REACT_APP_AI}/api/capture/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (capturing && count <= 100) {
      captureImage();
    }
  }, [count, capturing]);

  const startCapturing = () => {
    setCapturing(true);
  };

  const stopCapturing = () => {
    setCapturing(false);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const isIdEmpty = id.trim() === "";
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
  return (
    <>
      <ThemeProvider theme={createTheme()}>
        <>
          {/* <TopNav onNavOpen={() => setOpenNav(true)} onLoginRedirect={handleLoginRedirect} /> */}
          <Header onLoginRedirect={handleLoginRedirect}></Header>
          <SideNav onClose={() => setOpenNav(false)} open={openNav} />
          <LayoutRoot>
            <LayoutContainer>
              <div>
                <div>
                  <Title level={4}>ID:</Title>
                  <Input
                    value={id}
                    onChange={handleIdChange}
                    placeholder="Enter ID"
                    required
                    style={{ width: "40%" }}
                  />
                </div>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                />
                {count < 100 ? (
                  <Button
                    type="primary"
                    onClick={startCapturing}
                    disabled={isIdEmpty}
                  >
                    Chụp ảnh
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={stopCapturing}
                    disabled={!capturing}
                  >
                    Tắt 
                  </Button>
                )}
                <p>{count} ảnh đã chụp</p>
                <Button type="primary" onClick={stopCapturing}>
                  Train
                </Button>
              </div>
            </LayoutContainer>
          </LayoutRoot>
        </>
      </ThemeProvider>
    </>
  );
};

export default CameraCapture;