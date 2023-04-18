import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
 import styles from "./styles/Home.module.css"
import Header from "./Header";
import React from "react";
function Home(){
    return(
    <div className={styles.container}>
        <SideBar/>
       <div className={styles.outlet}> <Outlet/></div>
    </div>
    );
}

export default Home;