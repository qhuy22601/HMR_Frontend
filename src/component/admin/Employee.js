import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { SideNav } from "../layouts/dashboard/side-nav";
import { TopNav } from "../layouts/dashboard/top-nav";
import axios from "axios";
import { Form, Input, Modal, Space, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import NewEmModal from "../NewEmModal";
import styles from "../styles/Employee.module.css";
import Header from "../Header";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "../theme";
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
export default function Employee() {
  const columns = [
    // {
    // title: 'Id',
    //   dataIndex: 'id',
    //   key: 'id',
    //   render: (text) => <a>{text}</a>,
    // },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      size: "small",
      render: (image) => (
        <Link to={`/profile/${image}`}>
          <img
            alt={image}
            src={image}
            style={{
              width: 50,
              height: 50,
              border: "1px solid #d9d9d9",
              borderRadius: "10%",
            }}
          />
        </Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <Link to={`/profile/${record.id}`}>
          <a>{text}</a>
        </Link>
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "BirthDate",
      dataIndex: "birthDate",
      key: "birthDate",
      render: (text) =>
        moment(text, "YYYY-MM-DD").format("DD-MM-YYYY"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Level",
      dataIndex: "payGrade",
      key: "level",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined type="link" onClick={() => showEdit(record)} />
          <DeleteOutlined style={{ color: "red" }} />
        </Space>
      ),
    },
  ];

  const [employee, setEmployee] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [action, setAction] = useState();
  const [DataEdit, setDataEdit] = useState();

  async function getAllEm() {
    const result = await axios({
      method: "get",
      url: "/api/auth/getall",
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    });
    if (result.data != null && result.data.status === "Fail") {
      console.log(result.data.message);
    }
    if (result.data != null && result.data.status === "Success") {
      setEmployee(result.data.payload);
    }
  }

  useEffect(() => {
    getAllEm();
  }, []);

  function showAdd() {
    setVisibleModal(true);
    setAction("ADD");
    setDataEdit(null);
  }
  function showEdit(record) {
    setVisibleModal(true);
    setAction("EDIT");
    setDataEdit(record);
  }

  function hiddenModal() {
    setVisibleModal(false);
  }

  async function signUp(data) {
    await axios
      .post("/api/auth/save", data, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((result) => {
        if (result.data != null && result.data.status === "Fail") {
          console.log(result.data.message);
        }
        if (result.data != null && result.data.status === "Success") {
          console.log(result.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function edit(data) {
    await axios
      .post("/api/auth/changename", data, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((result) => {
        if (result.data != null && result.data.status === "Fail") {
          console.log(result.data.message);
        }
        if (result.data != null && result.data.status === "Success") {
          console.log(result.data.message);
          // localStorage.setItem("UserName", result.data.payload.username);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function save(data) {
    if (action === "ADD") {
      await signUp(data);
    } else {
      await edit(data);
    }
    await getAllEm();
    hiddenModal();
  }

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
            <div className={styles.table}>
              <PlusCircleTwoTone
                onClick={() => showAdd()}
                style={{
                  fontSize: 30,
                  padding: 20,
                  float: "right",
                  // marginTop: "60px",
                }}
              />
              <Table
                columns={columns}
                dataSource={employee}
                rowKey={(record) => record.id}
                bordered
              />
              <NewEmModal
                save={save}
                dataEdit={DataEdit}
                visible={visibleModal}
                hiddenModal={hiddenModal}
                action={action}
              ></NewEmModal>
            </div>
          </LayoutContainer>
        </LayoutRoot>
      </>
    </ThemeProvider>
  );
}
