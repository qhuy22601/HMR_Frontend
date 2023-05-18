import React, { useState, useEffect } from 'react';

const Random = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormClosed, setIsFormClosed] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFormOpen && isFormClosed) {
        setIsFormOpen(true);
      }
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [isFormOpen, isFormClosed]);

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setIsFormClosed(true);
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
    setIsFormClosed(false);
  };

  useEffect(() => {
    if (!isFormOpen && !isFormClosed) {
      const confirmation = window.confirm('Are you sure you want to close the form?');
      if (confirmation) {
        handleCloseForm();
      }
    }
  }, [isFormOpen, isFormClosed]);

  return (
    <div>
      {!isFormOpen && isFormClosed && (
        <button onClick={handleOpenForm}>Open Form</button>
      )}

      {isFormOpen && !isFormClosed && (
        <div className="formContainer">
          {/* Your form JSX */}
          <h1>hjidashidashidashihdasihdiasdhiasdhiasdhiasdh</h1>
          <h1>hjidashidashidashihdasihdiasdhiasdhiasdhiasdh</h1>
          <h1>hjidashidashidashihdasihdiasdhiasdhiasdhiasdh</h1>
          <h1>hjidashidashidashihdasihdiasdhiasdhiasdhiasdh</h1>
          <h1>hjidashidashidashihdasihdiasdhiasdhiasdhiasdh</h1>
          <h1>hjidashidashidashihdasihdiasdhiasdhiasdhiasdh</h1>
          <h1>hjidashidashidashihdasihdiasdhiasdhiasdhiasdh</h1>
          <h1>hjidashidashidashihdasihdiasdhiasdhiasdhiasdh</h1>
          <button onClick={handleCloseForm}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Random;
