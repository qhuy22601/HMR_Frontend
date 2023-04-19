import React, {useState, useEffect} from "react";
import axios from "axios";
import { Form, Input, Modal, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import NewEmModal from "../NewEmModal";
import styles from '../styles/Employee.module.css';


export default function Employee(){

    
    const columns = [
        // {
        // title: 'Id',
        //   dataIndex: 'id',
        //   key: 'id',
        //   render: (text) => <a>{text}</a>,
        // },
        {
          title: 'Name',
          dataIndex: 'username',
          key: 'username',
          render: (text) =><a>{text}</a>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <a>{text}</a>,
          },
        {
          title: 'Hire Date',
          dataIndex: 'hireDate',
          key: 'hireDate',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
          },
          {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
          },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
          },
          {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
          },
          {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
          },
          {
            title: 'Create At',
            dataIndex: 'createdAt',
            key: 'createAt',
          },
          {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
          },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
                <EditOutlined
                type="link"
                onClick={()=>showEdit(record)} />
                <DeleteOutlined style={{color: 'red'}} />
            </Space>
          ),
        },
      ];


    const [employee, setEmployee] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [action, setAction] = useState();
    const [DataEdit, setDataEdit] = useState();

    
    async function getAllEm(){
        const result = await axios({
            method: 'get',
            url: '/api/auth/getall',
            headers:{
                Authorization: localStorage.getItem("Token")
            },
        });
        if(result.data!=null && result.data.status==="Fail"){
            console.log(result.data.message);
        }
        if(result.data!=null && result.data.status==="Success"){
            setEmployee(result.data.payload);
        }
    }

    useEffect(()=>{
        getAllEm();
    });

    function showAdd(){
        setVisibleModal(true)
        setAction("ADD");
        setDataEdit(null);
    }
    function showEdit(record){
        setVisibleModal(true)
        setAction("EDIT");
        setDataEdit(record);
    }

    function hiddenModal(){
        setVisibleModal(false)
    }

    async function signUp(data){
      await axios
      .post("/api/auth/save",
      data,
      {
        headers:{
           Authorization: localStorage.getItem("Token")
   
        }
       })
      .then(result =>{
        if(result.data!=null && result.data.status==="Fail"){
          console.log(result.data.message);
      }
      if(result.data!=null && result.data.status==="Success"){
          console.log(result.data.message);
      }
      }).catch((error) => {
        console.log(error.message);
      })
    }
    

    async function edit(data){
    await axios
    .post("/api/auth/changename",
     data,
     {
     headers:{
        Authorization: localStorage.getItem("Token")

     }
    }
     ).then(result => {
        if(result.data!=null && result.data.status==="Fail"){
            console.log(result.data.message);
        }
        if(result.data!=null && result.data.status==="Success"){
            console.log(result.data.message);
            localStorage.setItem("UserName", result.data.payload.username);
        }
     })
     .catch((err) => {
        console.log(err)
     })
    }

    async function save(data){
        if(action==="ADD"){
          await signUp(data)
        }
        else{
            await edit(data)
        }
        await getAllEm();
        hiddenModal();
    }

    return(
        <div className={styles.table}>
        <PlusCircleTwoTone onClick={() => showAdd()}
         style={{fontSize:30, padding:20, float:"right"}}/>
            <Table  columns={columns} dataSource={employee} rowKey={(record) =>record.id} />
        <NewEmModal save={save} dataEdit={DataEdit} visible={visibleModal} hiddenModal={hiddenModal} action={action}></NewEmModal>
        </div>
    );
}