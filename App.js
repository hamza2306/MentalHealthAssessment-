import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

const questions = [
  "How often do you feel stressed?",
  "Do you find it hard to concentrate?",
  "Do you feel anxious frequently?",
  "Do you have trouble sleeping?",
];

const options = [
  "Never",
  "Rarely",
  "Sometimes",
  "Often",
  "Always"
];

function App() 
{
  const [responses, setResponses] = useState(Array(questions.length).fill(0));
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getResult = () => {
    const score = responses.reduce((acc, curr) => acc + parseInt(curr), 0);
    if (score < 5) return "You seem to be doing well!";
    if (score < 10) return "You might be experiencing some stress.";
    return "Consider seeking help from a professional.";
  };

  return (
    <div className="App">
      <h1>Mental Health Assessment</h1>
      <TransitionGroup>
        {!submitted ? (
          <CSSTransition
            key="form"
            timeout={500}
            classNames="fade"
          >
            <form onSubmit={handleSubmit}>
              {questions.map((question, index) => (
                <div key={index}>
                  <p>{question}</p>
                  {options.map((option, optionIndex) => (
                    <label key={optionIndex}>
                      <input
                        type="radio"
                        value={optionIndex}
                        checked={responses[index] === optionIndex}
                        onChange={() => handleOptionChange(index, optionIndex)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ))}
              <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
          </CSSTransition>
        ) : (
          <CSSTransition
            key="result"
            timeout={500}
            classNames="fade"
          >
            <div>
              <h2>Your Result</h2>
              <p>{getResult()}</p>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
}

export default App;
