import React, { useState, useEffect } from "react";
import styles from "../styles/Contact.module.css";

export default function Contact({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentImage, setCurrentImage] = useState(undefined);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("chat-app-current-user"));
    setCurrentUserName(data.lastName);
    setCurrentUserImage(data.image);
    setCurrentImage(data.image);

    console.log("dsadasadsdsa:"+ contacts[1].lastName)
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentImage && currentImage && (
        <div className={styles.container}>
          <div className={styles.contacts}>
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                  style={{ display: "flex" }}
                >
                  {contact.image ? (
                    <>
                      <div className={styles.avatar}>
                        <img
                          src={contact.image}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 60 / 2,
                          }}
                          alt=""
                        />
                      </div>

                      <div className={styles.username}>
                        <h2>{contact.lastName}</h2>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}