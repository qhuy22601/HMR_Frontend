// import React, { useState } from "react";
// import { Upload, Input, Button, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import axios from "axios";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// const UploadPage = () => {
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );

//   const handleFileChange = (file) => {
//     setFile(file);
//   };

//   const handleTitleChange = (event) => {
//     setTitle(event.target.value);
//   };

//   const handleEditorChange = (state) => {
//     setEditorState(state);
//   };

//   const handleUpload = () => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", title);
//     formData.append(
//       "content",
//       JSON.stringify(convertToRaw(editorState.getCurrentContent()))
//     );

//     axios
//       .post("http://171.238.155.142:8080/api/images/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((response) => {
//         message.success("Upload successful");
//         // Perform any additional actions after successful upload
//       })
//       .catch((error) => {
//         message.error("Upload failed: " + error.message);
//       });
//   };

//   return (
//     <div>
//       <h2>Upload Image</h2>
//       <Upload
//         beforeUpload={() => false}
//         onChange={(info) => handleFileChange(info.file)}
//       >
//         <Button icon={<UploadOutlined />}>Select File</Button>
//       </Upload>
//       <br />
//       <Input
//         placeholder="Title"
//         value={title}
//         onChange={handleTitleChange}
//         style={{ margin: "10px 0" }}
//       />
//       <br />
//       <div style={{ marginBottom: "10px" }}>
//         <Editor
//           editorState={editorState}
//           onEditorStateChange={handleEditorChange}
//         />
//       </div>
//       <div style={{ textAlign: "right" }}>
//         <Button type="primary" onClick={handleUpload}>
//           Upload
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default UploadPage;


import React, { useState, useEffect, useCallback } from "react";
import {
  Upload,
  Input,
  Button,
  message,
  Typography,
  Card,
  Image,
  Modal,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { backend } from "../utils/APIRoutes";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "../theme";
import Header from "../Header";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { SideNav } from "../layouts/dashboard/side-nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled.div`
  display: flex;
  flex: 1 1 auto;
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



const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  function toastSuccess(message) {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  function toastWarning(message) {
    toast.warning(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
   const resetForm = () => {
     setFile(null);
     setTitle("");
     setContent("");
   };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);

     const response = axios.post(`${process.env.REACT_APP_BACK_END}/api/images/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
       toastSuccess("Upload successful");
       resetForm();
        // Perform any additional actions after successful upload
      })
      .catch((error) => {
        toastWarning("Upload failed: " + error.message);
      });
  };

    const [imageDetails, setImageDetails] = useState([]);


  useEffect(() =>{
     const fetchImageDetails = async () => {
       try {
         const response = await axios.get(
           `${process.env.REACT_APP_BACK_END}/api/images`
         );
         setImageDetails(response.data);
       } catch (error) {
         console.error("Error fetching image details:", error);
       }
     };
     fetchImageDetails();
  },[])


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

const [deleteModalVisible, setDeleteModalVisible] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACK_END}/api/images/del/${selectedImage.id}`
      );
            toastSuccess("Xóa thành công");
      setDeleteModalVisible(false);
      setImageDetails((prevDetails) =>
        prevDetails.filter((image) => image.id !== selectedImage.id)
      );
    } catch (error) {
      toastWarning("Thất bại");
      console.error("Error deleting image:", error);
    }
  };

  const showDeleteModal = (image) => {
    setSelectedImage(image);
    setDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setSelectedImage(null);
    setDeleteModalVisible(false);
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
                title="Đăng thông báo"
                style={{
                  width: "80%",
                  marginTop: "20px",
                  marginLeft: "auto",
                  marginRight: 0,
                }}
                // onClick={handleCardClick}
              >
                <ToastContainer></ToastContainer>
                <Upload
                  beforeUpload={() => false}
                  onChange={(info) => handleFileChange(info.file)}
                >
                  <Button icon={<UploadOutlined />}>Chọn file</Button>
                </Upload>
                <br />
                <Input
                  placeholder="Thông báo"
                  value={title}
                  onChange={handleTitleChange}
                  style={{ margin: "10px 0" }}
                />
                <br />
                <Input.TextArea
                  placeholder="Nội dung"
                  value={content}
                  onChange={handleContentChange}
                  rows={4}
                />
                <br />
                <Button type="primary" onClick={handleUpload}>
                  Đăng
                </Button>
              </Card>
              <Card
                title="Tất cả thông báo"
                style={{
                  width: "80%",
                  marginTop: "20px",
                  marginLeft: "auto",
                  marginRight: 0,
                }}
              >
                {imageDetails.map((image) => (
                  <Card.Grid key={image.id} style={{ width: "fit-content" }}>
                    <h2>{image.title}</h2>
                    <Image
                      src={`${process.env.REACT_APP_BACK_END}${image.imageUrl}`}
                      alt={image.title}
                      width={151}
                    />
                    <br />
                    {moment(image.createAt).format("YYYY-MM-DD")}
                    <Typography>{image.content}</Typography>
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => showDeleteModal(image)}
                    ></Button>
                  </Card.Grid>
                ))}
              </Card>
            </LayoutContainer>
          </LayoutRoot>
        </>
      </ThemeProvider>
      <Modal
        title="Bạn có muốn xóa"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={hideDeleteModal}
        okText="Xóa"
        cancelText="Hủy"
      >
        Bạn có chắc muốn xóa ảnh này không?
      </Modal>
    </>
  );
};

export default UploadPage;