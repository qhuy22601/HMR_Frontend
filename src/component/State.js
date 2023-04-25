import React from "react";
import SideBar from "./SideBar";
import styles from "./styles/State.module.css"
export default function State(){

    return(
        <>
            <div className={styles.container}>
                <SideBar></SideBar>
                <div className={styles.main}>
                    <div>HMRS</div>
                </div>
            </div>
        </>
    );
}