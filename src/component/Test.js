import { useEffect, useState } from "react";
import axios from "axios";

export default function  Test(){

    const [contacts, setContacts] = useState([]);


    async function getall(){
        const res = await axios.get(
          "http://localhost:5000/api/auth/allusers/6466ec0eb63cb37b79f7f9a8"
        );
        setContacts(res.data)
    }
   
    useEffect(() => {
   
        // const data = axios.get(
        //   "http://localhost:5000/api/auth/allusers/6466ec0eb63cb37b79f7f9a8"
        // );
        // console.log("dhisadhisadhisa:" + data.data);
        // setContacts(data.data);
      
        getall();

    }, []);

    return(
        <div>
            {contacts.map((item)=>{
            return(
                <div key={item._id}>
                    <h1>{item._id}</h1>
                </div>
            )})}
        </div>
    )
}