import React, { useState, useEffect } from 'react';
import './CountDownTimer.css'; // Importing CSS for styling

const CountdownTimer = () => {
  const [countdownHours, setCountdownHours] = useState(1); // Initial countdown time in hours
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(countdownHours * 3600); // Convert hours to seconds

  // Function to start the timer
  const startTimer = () => {
    if (timer === null) {
      setTimer(setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000));
    }
  };

  // Function to stop the timer
  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
  };

  // Function to reset the timer
  const resetTimer = () => {
    clearInterval(timer);
    setTimer(null);
    setTimeLeft(countdownHours * 3600); // Convert hours to seconds
  };

  // Function to handle changes in countdown time input
  const handleChange = event => {
    const { value } = event.target;
    setCountdownHours(value);
    setTimeLeft(value * 3600); // Convert hours to seconds
  };

  // UseEffect to clear interval on component unmount
  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  // UseEffect to start the timer when the component mounts
  useEffect(() => {
    startTimer();
  }, []);

  // Convert timeLeft to hours, minutes, and seconds for display
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="countdown-container">
      <h1 className="countdown-title">Countdown Timer</h1>
      <div className="countdown-controls">
        <label htmlFor="countdownInput" className="countdown-label">Set Countdown Time (in hours):</label>
        <input
          type="number"
          id="countdownInput"
          value={countdownHours}
          onChange={handleChange}
          min="1"
          className="countdown-input"
        />
      </div>
      <div className="countdown-buttons">
        <button onClick={startTimer} className="countdown-button">Start</button>
        <button onClick={stopTimer} className="countdown-button">Stop</button>
        <button onClick={resetTimer} className="countdown-button">Reset</button>
      </div>
      <div className="countdown-time">
        Time Left: {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default CountdownTimer;
