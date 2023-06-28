import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInp from "./ChatInp";
// import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import styles from "../styles/ChatContainer.module.css"
import { Button } from "@mui/material";


export default function ChatContain({ currentChat, socket, onClose }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  // async function getFull(){
  //   const data = JSON.parse(localStorage.getItem("chat-app-current-user"));
  //   const response = await axios.post(recieveMessageRoute, {
  //     from: data.id,
  //     to: currentChat.id,
  //   });
  //   setMessages(response.data);
  // }

  useEffect(() => {
    // const data =  JSON.parse(
    //   localStorage.getItem("chat-app-current-user")
    // );
    // const response =  axios.post(recieveMessageRoute, {
    //   from: data.id,
    //   to: currentChat.id,
    // });
    // setMessages(response.data);
    async function getFull() {
      const data = await JSON.parse(
        localStorage.getItem("chat-app-current-user")
      );
      const response = await axios.post(recieveMessageRoute, {
        from: data.id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    getFull();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("chat-app-current-user")).id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("chat-app-current-user")
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data.id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data.id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleClose() {
    onClose();
  }

  return (
    <div className={styles.container}>
      <div className={styles.chat_header}>
        <div className={styles.user_details}>
          <div className={styles.avatar}>
            <img
              // src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              src={currentChat.image}
              alt=""
              style={{
                width: 60,
                height: 60,
                borderRadius: 60 / 2,
                marginTop: 8,
              }}
            />
          </div>
          <div className={styles.username}>
            <h3>{currentChat.firstName} {currentChat.lastName} </h3>
          </div>
          <div className={styles.close}>
            <Button onClick={handleClose}>X</Button>
          </div>
        </div>
        {/* <Logout /> */}
      </div>
      <div className={styles.chat_messages}>
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`${styles.message} ${
                  message.fromSelf ? styles.sended : styles.received
                }`}
              >
                <div className={styles.content}>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInp handleSendMsg={handleSendMsg} />
    </div>
  );
}
