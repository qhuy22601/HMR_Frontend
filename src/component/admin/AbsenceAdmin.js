import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header"
import SideBar from "../SideBar";
import styles from "../styles/Absence.module.css"
import { Button, Radio, Space, Divider,Form, Input, Modal, Table } from 'antd';
import {
  DeleteOutlined,
} from "@ant-design/icons";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "../theme";
import { SideNav } from "../layouts/dashboard/side-nav";
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

function AbsenceAdmin(){
    const [data, setData] = useState([])
    const [cnt, setCnt] = useState(null)


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
        ),
      },
      {
        title: "Name",
        dataIndex: "userName",
        key: "userName",
        render: (text) => <a>{text}</a>,
      },
      // {
      //   title: "Email",
      //   dataIndex: "email",
      //   key: "email",
      //   render: (text) => <a>{text}</a>,
      // },
      {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate",
        render: (startDate) => moment(startDate).format("YYYY-MM-DD"),
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
        render: (endDate) => moment(endDate).format("YYYY-MM-DD"),
      },
      {
        title: "Reason",
        dataIndex: "reason",
        key: "reason",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={() => approve(record.id)}
            >
              Approve
            </Button>
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => del(record.id)}
            />
          </Space>
        ),
      },
    ];

    async function del(id){
      await axios.delete("/api/absence/" +id)
    }

    async function getAll(){
        const result = await axios({
            method: 'get',
            url: '/api/absence/getall',
              params: {
                _cacheBuster: Date.now(), // Add a random query parameter to bypass caching
              },
            headers:{
                Authorization: localStorage.getItem("Token")
            },
        });
        if(result.data!=null && result.data.status==="Fail"){
            console.log(result.data.message);
        }
        if(result.data!=null && result.data.status==="Success"){
            setData([...result.data.payload]);
        }
    }

    // async function countUnread(){
    //     const res = await axios({
    //         method:"get",
    //         url:"/api/absence/count-unread",
    //         headers:{
    //             Authorization: localStorage.getItem("Token")
    //         }
    //     });
    //     setCnt(res.data);
    // }

    async function approve(absenceId){
        const res =  await axios ({
            method:"put",
            url:"/api/absence/approve/" + absenceId,
            headers:{
                Authorization: localStorage.getItem("Token"),
            },
            data:{
                id: absenceId
            }
        })
    }

    useEffect(()=>{
        getAll();
        // countUnread();
    },[]);


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
              <div className={styles.container}>
                {/* <Header></Header> */}
                <div className={styles.list_leave}>
                  {/* {data.map((item) =>{
                return (
                    <div key={item.id}>
                        <image src={item.image}></image>
                        <span>{item.userName}</span>
                        <span>{item.startDate}</span>
                        <span>{item.endDate}</span>
                        <span>{item.status}</span>
                        <span>{item.reason}</span>
                        <button onClick={() => approve(`${item.id}`)}>{item.unread}</button><br/>
                    </div>
                )
            })} */}
                  <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={(record) => record.id}
                    bordered
                  />
                </div>
              </div>
            </LayoutContainer>
          </LayoutRoot>
        </>
      </ThemeProvider>
    );
}

export default AbsenceAdmin;