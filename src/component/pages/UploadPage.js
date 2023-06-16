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
//       .post("/api/images/upload", formData, {
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


import React, { useState } from "react";
import { Upload, Input, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

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

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);

    axios
      .post("/api/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        message.success("Upload successful");
        // Perform any additional actions after successful upload
      })
      .catch((error) => {
        message.error("Upload failed: " + error.message);
      });
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <Upload
        beforeUpload={() => false}
        onChange={(info) => handleFileChange(info.file)}
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <br />
      <Input
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        style={{ margin: "10px 0" }}
      />
      <br />
      <Input.TextArea
        placeholder="Content"
        value={content}
        onChange={handleContentChange}
        rows={4}
      />
      <br />
      <Button type="primary" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default UploadPage;