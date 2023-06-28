// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import { Image } from "antd";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { CardHeader } from "@mui/material";
// import { Pagination } from "antd";
// import { backend } from "../utils/APIRoutes";

// const DisplayPage = () => {
//   const [imageDetails, setImageDetails] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(2);
//   const theme = useTheme();

//   useEffect(() => {
//     fetchImageDetails();
//   }, []);

//   const fetchImageDetails = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BACK_END}/api/images?page=${currentPage}&size=${pageSize}`
//       );
//       setImageDetails(response.data);
//     } catch (error) {
//       console.error("Error fetching image details:", error);
//     }
//   };

//   const handlePageChange = (page, pageSize) => {
//     setCurrentPage(page);
//     setPageSize(pageSize);
//   };

//   return (
//     <div>
//       {imageDetails.map((image) => {
//         return (
//           <>
//             <Card
//               sx={{
//                 display: "flex",
//               }}
//               key={image.id}
//             >
//               <Image
//                 component="img"
//                 width={151}
//                 src={`${process.env.REACT_APP_BACK_END}${image.imageUrl}`}
//                 alt="Anh"
//               />
//               <Box sx={{ display: "flex", flexDirection: "column" }}>
//                 <CardContent sx={{ flex: "1 0 auto" }}>
//                   <Typography component="div" variant="h5">
//                     {image.content}
//                   </Typography>
//                   <Typography
//                     variant="subtitle1"
//                     color="text.secondary"
//                     component="div"
//                   >
//                     {image.title}
//                   </Typography>
//                 </CardContent>
//               </Box>
//             </Card>
//           </>
//         );
//       })}

//       <Pagination
//         current={currentPage}
//         pageSize={pageSize}
//         total={imageDetails.length}
//         onChange={handlePageChange}
//         showSizeChanger={false}
//       />
//     </div>
//   );
// };

// export default DisplayPage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Image } from "antd";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";
import { Pagination } from "antd";
import { backend } from "../utils/APIRoutes";
import moment from "moment";
const DisplayPage = () => {
  const [imageDetails, setImageDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const theme = useTheme();

  useEffect(() => {
    fetchImageDetails();
  }, []);

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

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  // Logic to calculate the index range for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = imageDetails.slice(startIndex, endIndex);

  return (
    <div>
      {currentPageData.map((image) => {
        return (
          <Card
            sx={{
              display: "flex",
            }}
            key={image.id}
          >
            <Image
              component="img"
              width={151}
              src={`${process.env.REACT_APP_BACK_END}${image.imageUrl}`}
              alt="Anh"
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto", padding:"15px 16px " }}>
                <Typography component="div" variant="h5">
                  {image.title}
                </Typography>
                <Typography>
                  {moment(image.createAt).format("YYYY-MM-DD")}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {image.content}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        );
      })}

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={imageDetails.length}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default DisplayPage;

