import axios from 'axios';
import './App.css';
import AppContainer from './component/AppContainer';
import Header from './component/Header';
import styles from './component/styles/All.module.css';
import Random from './component/user/Random';

import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Space, Table } from 'antd';


const PopupWindow = ({ onClose, popupInterval }) => {
  const handleClose = () => {
    onClose();
  };
 
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState();
  const [isValid, setIsValid] = useState(false);
  const [remainingTime, setRemainingTime] = useState(popupInterval);

  async function getQuestion(){
    await axios
    .get("/api/quiz/get",
    {
      headers:{
         Authorization: localStorage.getItem("Token")
 
      }
     })
    .then(result =>{
      setData(result.data);
    }).catch((error) => {
      console.log(error.message);
    })
  }


  async function validAnswer(){
    await axios.post("/api/quiz/validate/" + data.id,
    {answer},
      {headers:{
        Authorization: localStorage.getItem("Token")
      }}
    ).then(response =>{
        setIsValid(response.data);
    }).catch(err =>{
      console.log(err);
    })
  }

  

  useEffect(() => {
    getQuestion();

    const intervalId = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1000);
    }, 1000);
    
    const timerId = setTimeout(() => {
      handleClose();
    }, popupInterval);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (isValid) {
      handleClose();
    }
  }, [isValid]); 

  useEffect(() => {
    if (remainingTime <= 0) {
      handleClose();
    }
  }, [remainingTime]);

  return (
    <div className={styles.popup_container}>
      <div className={styles.popup_content}>
       
      {data && (
          <div>
            <h2>{data.question}</h2>
          </div>
        )}
          <Form>
            <Form.Item label="Answer">
                <Input onChange={(e) => setAnswer(e.target.value)} name={answer}></Input>
            </Form.Item>
          </Form>
          {isValid !== null && (
          <p>{isValid ? 'Correct answer!' : 'Incorrect answer!'}</p>
        )}
        <p>Remaining Time: {remainingTime / 1000}s</p>
        <button onClick={()=>validAnswer()}>submit</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const popupInterval = Math.floor(Math.random() * 120000) + 60000;

  const handleOpenPopup = () => {
    if (!showPopup) {
      setShowPopup(true);
    }
  };


  ////them casi api fukoff 
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleOpenPopup();
    }, popupInterval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
    <div className={styles.container}>
      <AppContainer />
    </div>
    {showPopup && <PopupWindow onClose={handleClosePopup} popupInterval={popupInterval} />}
    </div>
  );
}

export default App;
