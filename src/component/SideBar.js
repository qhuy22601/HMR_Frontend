import React from 'react';
import styles from './styles/SideBar.module.css';
import { FaHome, FaUser, FaMoneyBillAlt, FaCog, FaCalendarTimes } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

function SideBar() {

  // function logout(){
  //   localStorage.clear();
  // }                                                                                                                                                                                                                                                                                                                                                                      )

  return (
    <div className={styles.sidebar}>
    <ul className={styles.sidebar_nav}>
      <li className={styles.sidebar_nav_item}>
        <span className={styles.sidebar_nav_link}>
          <FaHome className={styles.sidebar_icon} />
          <span className={styles.sidebar_text}>Home</span>
        </span>
      </li>
      <li className={styles.sidebar_nav_item}>
        <span className={styles.sidebar_nav_link}>
            <Link to="employee">
          <FaUser className={styles.sidebar_icon} />
          <span className={styles.sidebar_text}>Employees</span>
          </Link>
        </span>
      </li>
      <li className={styles.sidebar_nav_item}>
        <span  className={styles.sidebar_nav_link}>
          <FaMoneyBillAlt className={styles.sidebar_icon} />
          <span className={styles.sidebar_text}>Payslip</span>
        </span>
      </li>
      <li className={styles.sidebar_nav_item}>
        <span  className={styles.sidebar_nav_link}>
          <FaCalendarTimes className={styles.sidebar_icon} />
          <span className={styles.sidebar_text}>Leave</span>
        </span>
      </li>
      <li className={styles.sidebar_nav_item}>
        <span className={styles.sidebar_nav_link}>
          <FaCog className={styles.sidebar_icon} />
          <span className={styles.sidebar_text}>Settings</span>
        </span>
      </li>
      <li className={styles.sidebar_nav_item} onClick={""}>
        <span className={styles.sidebar_nav_link}>
          <BiLogOut className={styles.sidebar_icon} />
          <span className={styles.sidebar_text}>Log Out</span>
        </span>
      </li>
    </ul>
  </div>
    );
}

export default SideBar;