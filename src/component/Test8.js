// import React, { useState, useRef } from "react";
// import { ai } from "./utils/APIRoutes";

// const CheckOutForm = () => {
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

//   const handleCheckOut = () => {
//     if (imageData) {
//       const formData = new FormData();
//       formData.append("image", dataURItoBlob(imageData));

//       fetch(`${process.env.REACT_APP_AI}/api/check_out/`, {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => {
//           if (response.ok) {
//             console.log("Check-out successful");
//           } else {
//             console.log("Check-out failed");
//           }
//         })
//         .catch((error) => {
//           console.error("Error during check-out:", error);
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
//         <button onClick={handleCheckOut}>Check Out</button>
//       </div>
//     </div>
//   );
// };

// export default CheckOutForm;

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import { CameraOutlined } from "@ant-design/icons";
import { ai } from "./utils/APIRoutes";
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

const CheckOutForm = () => {
  const [imageData, setImageData] = useState(null);
  const videoRef = useRef(null);

  const handleStartCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  const handleCaptureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg");
    setImageData(dataUrl);
  };

  const handleCheckOut = () => {
    if (imageData) {
      const formData = new FormData();
      formData.append("image", dataURItoBlob(imageData));

      fetch(`${process.env.REACT_APP_AI}/api/check_out/`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("Check-out successful");
          } else {
            console.log("Check-out failed");
          }
        })
        .catch((error) => {
          console.error("Error during check-out:", error);
        });
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };
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
    <ThemeProvider theme={createTheme()}>
      <>
        {/* <TopNav onNavOpen={() => setOpenNav(true)} onLoginRedirect={handleLoginRedirect} /> */}
        <Header onLoginRedirect={handleLoginRedirect}></Header>
        <SideNav onClose={() => setOpenNav(false)} open={openNav} />
        <LayoutRoot>
          <LayoutContainer>
            <div>
              <Row justify="center" gutter={[16, 16]}>
                <Col>
                  <Button
                    type="primary"
                    icon={<CameraOutlined />}
                    onClick={handleStartCamera}
                  >
                    Mở camera
                  </Button>
                </Col>
              </Row>
              <Row justify="center" gutter={[16, 16]}>
                <Col>
                  <video ref={videoRef} autoPlay />
                </Col>
              </Row>
              <Row justify="center" gutter={[16, 16]}>
                <Col>
                  <Button onClick={handleCaptureImage}>Chụp hình</Button>
                </Col>
              </Row>
              <Row justify="center" gutter={[16, 16]}>
                <Col>{imageData && <img src={imageData} alt="Captured" />}</Col>
              </Row>
              <Row justify="center" gutter={[16, 16]}>
                <Col>
                  <Button
                    type="primary"
                    onClick={handleCheckOut}
                    disabled={!imageData}
                  >
                    Check Out
                  </Button>
                </Col>
              </Row>
            </div>
          </LayoutContainer>
        </LayoutRoot>
      </>
    </ThemeProvider>
  );
};

export default CheckOutForm;
