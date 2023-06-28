import React, { useState, useEffect } from "react";
import styles from "../styles/Contact.module.css";

export default function Contact({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentFirstName, setCurrentFirstName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentImage, setCurrentImage] = useState(undefined);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("chat-app-current-user"));
    setCurrentUserName(data.lastName);
    setCurrentFirstName(data.firstName)
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
                  style={{ display: "flex" , border:"1px"}}
                  hover
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
                          <h4>
                            {index === currentSelected ? (
                              <strong>
                                {contact.lastName} {contact.firstName}
                              </strong>
                            ) : (
                              `${contact.lastName} ${contact.firstName}`
                            )}
                          </h4>
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