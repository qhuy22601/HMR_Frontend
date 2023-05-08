import React from "react";
import Header from "./Header";
import styles from "./styles/State.module.css"
import { Outlet } from "react-router-dom";


export default function State(){
    const handleLoginRedirect = () => {
    window.location.href = "#/login";  
    };
    return (
      <>
        <div className={styles.container}>
          <Header onLoginRedirect={handleLoginRedirect} />
          {/* <div className={styles.main}>
            <div>HMRS</div>
          </div> */}

        </div>
      </>
    );
}