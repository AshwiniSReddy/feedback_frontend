
import './App.css';
import { QAcontext } from './createContext/createContext';
import { useState } from 'react';
import Page from './page/page';
import male from './images/Male icon.svg'
import female from './images/Female icon.svg'
import none from './images/None icon.svg'
import knowledge from './images/Bulb icon.svg'
import entertainment from './images/Entertainment happy icon.svg'
import both from './images/Knowledge and entertainment icon.svg'
import react1 from './images/1 reaction icon.svg'
import react2 from './images/2 reaction icon.svg'
import react3 from './images/3 reaction icon.svg'
import react4 from './images/4 reaction icon.svg'
import react5 from './images/5 reaction icon.svg'
import quality from './images/Best exhibits icon.svg'
import value_for_money from './images/Rupee icon.svg'
import interaction from './images/Touch icon.svg'
import explaination from './images/Conversation icon.svg'


function App() {
  const [qaList, setQaList] = useState([
    { question: 'Please select your gender', answer: '' }, // Repeat this 7 times or as needed
    { question: 'Please enter your age', answer: '' },
    { question: 'What did you gain the most from PARSEC', answer: '' },
    { question: 'How satisfied are you with your visit to PARSEC?', answer: '' },
    { question: 'What could we improve?', answer: '' },
    { question: 'Any suggestions or specific bad experience you would like to bring to our notice?', answer: '' },
    { question: 'Any appreciation for a facilitator/ exhibit/ experience you had here today?', answer: '' },
    // ...
  ]);

  const [display_qaList, setDisplay_qaList] = useState([
    {
      id: 0,
      question: 'Please select your gender',
      image: [male, female, none],
      display_names: ["Male", "Female", "both"]
    },
    {
      id: 1,
      question: 'Please enter your age',
      image: null,
      display_names: ["Your answer"]
    },
    {
      id: 2,
      question: 'What did you gain the most from PARSEC',
      image: [knowledge, entertainment, both],
      display_names: ["Knowledge", "Entertainment", "Both"]
    },
    {
      id: 3,
      question: 'How satisfied are you with your visit to PARSEC?',
      image: [react1, react2, react3, react4, react5],
      display_names: ["Excellent", "Good", "Average", "Poor", "Worst"]

    },
    {
      id: 4,
      question: 'What could we improve?',
      image: [quality, value_for_money, interaction, explaination],
      display_names: ["Quatity of exhibit", "Value for money", "Interactivity of exhibit", "explanation of exhibit"]

    },
    {
      id: 5,
      question: 'Any suggestions or specific bad experience you would like to bring to our notice?',
      image: null,
      display_names: ["Your answer"]
    },
    {
      id: 6,
      question: 'Any appreciation for a facilitator/ exhibit/ experience you had here today?',
      image: null,
      display_names: ["Your answer"]
    },
   


  ])
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNextClick = () => {
      if (currentIndex < display_qaList.length ) {
          setCurrentIndex(currentIndex + 1);
      }
  };
  const handleBackClick = () => {
    if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
    }
};

const handleSubmit = async () => {
  if (currentIndex < display_qaList.length - 1) {
    setCurrentIndex(currentIndex + 1);
}
  try {
      const response = await fetch('http://localhost:5000/feedback', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ feedback: qaList }),
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Feedback submitted:', data);
          // Handle successful submission (e.g., show a message or redirect)
      } else {
          console.error('Failed to submit feedback');
          // Handle errors (e.g., show an error message)
      }
  } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle network errors (e.g., show an error message)
  }
};



  const currentQA = display_qaList[currentIndex];
  console.log(qaList,"qalist")

  return (
    <div className='App'>
      <QAcontext.Provider value={{ qaList, setQaList, display_qaList, setDisplay_qaList,handleNextClick,currentQA, handleBackClick,currentIndex ,setQaList,handleSubmit}}>

        <Page />

      </QAcontext.Provider>
    </div>


  );
}

export default App;
