import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, DatePicker, Button, message } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { backend } from "../utils/APIRoutes";
import moment from "moment";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "../theme";
import styled from "styled-components";
import Header from "../Header";
import { SideNav } from "../layouts/dashboard/side-nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const { RangePicker } = DatePicker;

const AbsenceForm = () => {
  const [form] = Form.useForm();
    const [id, setId] = useState(localStorage.getItem("Id"));



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
  const handleSubmit = async (values) => {
    const { userId, dateRange, reason } = values;
    const [startDate, endDate] = dateRange;
    
    if (startDate > endDate) {
      toastWarning("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
      return;
    }

    try {
      const formattedStartDate = startDate.startOf("day").toISOString();
      const formattedEndDate = endDate.endOf("day").toISOString();
      await axios.post(`${process.env.REACT_APP_BACK_END}/api/absence/save`, {
        userId: id,
        startDate: formattedStartDate.format("YYYY-MM-DD"),
        endDate: formattedEndDate.format("YYYY-MM-DD"),
        reason,
      });
      toastSuccess("Tạo thành công");
      form.resetFields();
    } catch (error) {
      toastWarning("Tạo thất bại");
    }
  };
   const handleLoginRedirect = () => {
     window.location.href = "/login";
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
            <ToastContainer />
            <LayoutContainer>
              <Form form={form} onFinish={handleSubmit} layout="vertical">
                {/* <Form.Item
        name="userId"
        label="User ID"
        rules={[{ required: true, message: "Please enter the user ID" }]}
      >
        <Input />
      </Form.Item> */}
                <Form.Item
                  name="dateRange"
                  label="Chọn ngày"
                  rules={[
                    {
                      type: "array",
                      required: true,
                      message: "Please select a date range",
                    },
                  ]}
                >
                  <RangePicker />
                </Form.Item>
                <Form.Item
                  name="reason"
                  label="Lí do"
                  rules={[
                    { required: true, message: "Please enter the reason" },
                  ]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Tạo
                  </Button>
                </Form.Item>
              </Form>
            </LayoutContainer>
          </LayoutRoot>
        </>
      </ThemeProvider>
    </>
  );
};

export default AbsenceForm;
