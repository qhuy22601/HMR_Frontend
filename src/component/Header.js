import React from "react";
import { FaSearch, FaBell,FaUserCircle, FaBars } from "react-icons/fa";
import styles from "./styles/Navbar.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Header() {
    const [notificationCount, setNotificationCount] = useState();
    const userName = localStorage.getItem("UserName")
 
    async function countUnread(){
        const res = await axios({
            method:"get",
            url:"/api/absence/count-unread",
            headers:{
                Authorization: localStorage.getItem("Token")
            }
        });
        setNotificationCount(res.data);
    }

    useEffect(()=>{
      if(localStorage.getItem("Token")){
        countUnread();
      }
    },[notificationCount]);


    return (
      <div className={styles.navbar}>
        <div className={styles.navbar_container}>
          <div className={styles.navbar_search}>
            <div className={styles.search_container}>
              <input
                type="text"
                className={styles.search_input}
                placeholder="Search"
              />
              <FaSearch className={styles.search_icon} />
            </div>
          </div>
          {localStorage.getItem("Token")?(
             <div className={styles.navbar_items}>
             <div className={styles.navbar_notification}>
               <FaBell className={styles.notification_icon} />
               {notificationCount > 0 && (
                 <div className={styles.notification_count}>{notificationCount}</div>
               )}
             </div>
             <div className={styles.navbar_user}>
               <FaUserCircle className={styles.user_icon} />
               <span className={styles.user_name}>{userName}</span>
             </div>
           </div>):(
             <div className={styles.navbar_items}>
                <a href="/#/login">SignIn</a>
                </div>
            )
          }
         
          
        </div>
        
      </div>
    );
  };

export default Header;