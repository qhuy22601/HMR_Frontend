import React from "react";
import { FaSearch, FaBell,FaUserCircle, FaHome,
  FaUser,
  FaMoneyBillAlt,
  FaCog,
  FaCalendarTimes, } from "react-icons/fa";
import styles from "./styles/Navbar.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";




function Header({ onLoginRedirect }) {
  const [notificationCount, setNotificationCount] = useState();
  const userName = localStorage.getItem("UserName");
  const [notif, setNotif] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  async function countUnread() {
    try {
      const res = await axios({
        method: "get",
        url: "/api/absence/count-unread",
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      });
      setNotificationCount(res.data);
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 500) {
        onLoginRedirect();
      }
    }
  }
  async function read() {
    try {
      const res = await axios({
        method: "put",
        url: "/api/absence/unread",
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      });
    } catch (error) {
      console.log(error.response.status);
      
    }
  }

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      countUnread();
    }
  }, [notificationCount]);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    console.log("jdidsa");
    getNotif();
    console.log(notif);
  };

  async function getNotif() {
    const res = await axios.get("/api/absence/notif", {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    });
    if (res.data != null && res.data.status === "Fail") {
      console.log(res.data.mess);
    }
    if (res.data != null && res.data.status === "Success") {
      console.log(res.data.mess);
      setNotif(res.data.payload);
      read()
    }
  }

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
        <div className={styles.navbar_options}>
          <div className={styles.options_container}>
            <ul className={styles.sidebar_nav}>
              <li className={styles.sidebar_nav_item}>
                <Link to ="/" className={styles.sidebar_nav_link}>
                  <FaHome className={styles.sidebar_icon} />
                  <span className={styles.sidebar_text}>Home</span>
                </Link>
              </li>
              <li className={styles.sidebar_nav_item}>
                <Link to="/employee" className={styles.sidebar_nav_link}>
                  {/* <Link to="/employee"> */}
                  <FaUser className={styles.sidebar_icon} />
                  <span className={styles.sidebar_text}>Employees</span>
                </Link>
                {/* </span> */}
              </li>
              <li className={styles.sidebar_nav_item}>
                <span className={styles.sidebar_nav_link}>
                  <FaMoneyBillAlt className={styles.sidebar_icon} />
                  <span className={styles.sidebar_text}>Payslip</span>
                </span>
              </li>
              <li className={styles.sidebar_nav_item}>
                <Link to="/leave" className={styles.sidebar_nav_link}>
                  <FaCalendarTimes className={styles.sidebar_icon} />
                  <span className={styles.sidebar_text}>Leave</span>
                </Link>
              </li>
              <li className={styles.sidebar_nav_item}>
                <span className={styles.sidebar_nav_link}>
                  <FaCog className={styles.sidebar_icon} />
                  <span className={styles.sidebar_text}>Settings</span>
                </span>
              </li>
              {/* <li className={styles.sidebar_nav_item} onClick={""}>
                <span className={styles.sidebar_nav_link}>
                  <BiLogOut className={styles.sidebar_icon} />
                  <span className={styles.sidebar_text}>Log Out</span>
                </span>
              </li> */}
            </ul>
          </div>
        </div>
        {localStorage.getItem("Token") ? (
          <div className={styles.navbar_items}>
            <div
              className={styles.navbar_notification}
              onClick={handleBellClick}
            >
              <FaBell className={styles.notification_icon} />
              {notificationCount > 0 && (
                <div className={styles.notification_count}>
                  {notificationCount}
                </div>
              )}
              {showNotifications && (
                <div className={styles.notification_dropdown}>
                  {notif.map((notification) => {
                    return (
                      <div
                        key={notification.id}
                        className={styles.notification_item}
                      >
                        <div className={styles.notification_status}>
                          {notification.status}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className={styles.navbar_user}>
              <FaUserCircle className={styles.user_icon} />
              <a href="/#/profile" className={styles.user_name}>
                {userName}
              </a>
            </div>
          </div>
        ) : (
          <div className={styles.navbar_items}>
            <a href="/#/login">SignIn</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;