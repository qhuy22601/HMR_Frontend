import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";

const DisplayPage = () => {
  const [imageDetails, setImageDetails] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    fetchImageDetails();
  }, []);

  const fetchImageDetails = async () => {
    try {
      const response = await axios.get("/api/images");
      setImageDetails(response.data);
    } catch (error) {
      console.error("Error fetching image details:", error);
    }
  };
  return (
    <div >
      {imageDetails.map((image) => {
        return (
          <>
            <Card
              sx={{
                display: "flex",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                src={image.imageUrl}
                alt="Anh"
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {image.content}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {image.title}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </>
        );
      })}
    </div>
  );

 
};

export default DisplayPage;
