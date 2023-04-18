import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from "react-modal";


function Random() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  async function fetch(){
    const res = await axios({
        method: 'GET',
        url:"/api/test",
        headers: {
            Authorization: localStorage.getItem("Token")
        },
    });
    setQuestion(res.data);
  }


  useEffect(() => {

    fetch()
    const randomTime = Math.floor(Math.random() * (5 - 3 + 1) + 3) * 60 * 60 * 1000;

    // Set an interval to open the modal window after the random time
    const interval = setInterval(() => {
      setIsOpen(true);
    }, randomTime);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);

  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post('/questions/validate', {
      questionId: question.id,
      answer: answer
    });
    setIsCorrect(response.data);
  }

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  }

  return (
    <Modal isOpen={isOpen}>
      {question && (
        <div className={styles.modal} style={{ display: isCorrect ? 'none' : 'block' }}>
          <div className={styles.modal-content}>
            <h2>{question.title}</h2>
            <p>{question.description}</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="answer">Answer:</label>
              <input type="text" id="answer" name="answer" value={answer} onChange={handleAnswerChange} />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      {isCorrect && <p>Congratulations, you answered the question correctly!</p>}
    </Modal>
  );
}

export default Random;