import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../Header"
import SideBar from "../SideBar";

function AbsenceAdmin(){
    const [data, setData] = useState([])
    const [cnt, setCnt] = useState(null)

    async function getAll(){
        const result = await axios({
            method: 'get',
            url: '/api/absence/getall',
            headers:{
                Authorization: localStorage.getItem("Token")
            },
        });
        if(result.data!=null && result.data.status==="Fail"){
            console.log(result.data.message);
        }
        if(result.data!=null && result.data.status==="Success"){
            setData(result.data.payload);
        }
    }

    async function countUnread(){
        const res = await axios({
            method:"get",
            url:"/api/absence/count-unread",
            headers:{
                Authorization: localStorage.getItem("Token")
            }
        });
        setCnt(res.data);
    }

    function approve(absenceId){
        const res = axios ({
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
        countUnread();
    },[]);

    // useEffect(()=>{
        
    // },[])
    return (
        <div>
            <div>   
            {data.map((item) =>{
                return (
                    <div key={item.id}>
                        <span>{item.userId}</span><br/>
                        <span>{item.startDate}</span><br/>
                        <span>{item.endDate}</span><br/>
                        <span>{item.status}</span><br/>
                        <button onClick={() => approve(`${item.id}`)}>{item.unread}</button><br/>
                    </div>
                )
            })}
            </div>
            
        </div>
    )
}

export default AbsenceAdmin;