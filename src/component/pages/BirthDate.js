import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Image, Divider } from "antd";
import "../styles/BirthDateList.css"; // Import custom CSS file for styling
import { backend } from "../utils/APIRoutes";

const BirthDateList = () => {
  const [birthDates, setBirthDates] = useState([]);

  useEffect(() => {
    fetchBirthDates();
  }, []);

  const fetchBirthDates = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_END}/api/auth/birth`
      );
      setBirthDates(response.data);
    } catch (error) {
      console.error("Error fetching birth dates:", error);
    }
  };

  const formatBirthDate = (birthDate) => {
    const date = new Date(birthDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="birth-date-list">
      {birthDates.map((user) => (
        <Card
          key={user.id}
          className="birth-date-card"
          style={{ width: 240, marginBottom: "10px" }}
        >
          <div className="image-container">
            <Image
              component="img"
              width={240}
              height={130}
              src={user.image}
              alt="Anh"
            />
          </div>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2">
              Sinh nhật: {formatBirthDate(user.birthDate)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BirthDateList;
