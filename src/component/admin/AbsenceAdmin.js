import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../Header"
import SideBar from "../SideBar";
import styles from "../styles/Absence.module.css"
import { Button, Radio, Space, Divider,Form, Input, Modal, Table } from 'antd';


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
        },
        {
          title: "End Date",
          dataIndex: "endDate",
          key: "endDate",
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
            // <Space size="middle">
            //   <EditOutlined type="link" onClick={() => showEdit(record)} />
            //   <DeleteOutlined style={{ color: "red" }} />
            // </Space>
            <Button type="primary" shape="round"  size="large" onClick={() => approve(record.id)}>
            Approve
          </Button>
          ),
        },
      ];

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

    return (
        <div className={styles.container}>
            <Header></Header>
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
    )
}

export default AbsenceAdmin;