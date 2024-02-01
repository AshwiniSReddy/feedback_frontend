import React from 'react'
import './Display.css'
import { useContext, useState } from 'react'
import { QAcontext } from '../createContext/createContext'
function Display() {
    const { display_qaList, handleNextClick, currentQA, qaList, setQaList, currentIndex,selectedDiv,setSelectedDiv,validationMessage,setValidationMessage } = useContext(QAcontext)
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default action of Enter key (new line)
            if (!qaList[currentIndex].answer.trim()) {
                setValidationMessage('This field is required'); // Set the validation message
            } else {
                setValidationMessage(''); // Clear any previous validation messages
                handleNextClick(); // Move to the next question
            }
        }
    };
    

    const handleClick = (selectedAnswer,index) => {
        setSelectedDiv(index); // Set the selected div index

        const newQaList = qaList.map((item, index) => {
            if (index === currentIndex) {
                return { ...item, answer: selectedAnswer };
            }
            return item;
        });
        setQaList(newQaList);
    };
    const handleTextareaChange = (e) => {
        const updatedAnswer = e.target.value;
        const newQaList = qaList.map((item, index) => {
            if (index === currentIndex) {
                return { ...item, answer: updatedAnswer };
            }
            return item;
        });
        setQaList(newQaList);
    };
      // Determine if the custom style should be applied
      const customStyle = [1].includes(currentIndex) ? { width: '80vw', height: '18vh' ,gap:"3vw"} : {width:'80vh',height:'28vh'};



    return (
        <div className='display' style={customStyle}>
            <div className='display_question'>
                <h2 className='display_question_inner'>{currentQA.question}</h2>
            </div>
            <div className='display_question_inner'>
                {currentQA.image ? (
                    <div className='display_image'>
                        {currentQA.image.map((img, index) => (
                            <div key={index} className='button'   onClick={() => {
                                handleClick(currentQA.display_names[index], index);
                                handleNextClick();
                            }}  style={{ opacity: selectedDiv === -1 || selectedDiv === index ? 1 : 0.5 }} >
                                <img src={img} alt={currentQA.display_names[index]} />
                                <span className="names">{currentQA.display_names[index]}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='display_textarea'>

                        <textarea
                            placeholder="Your answer"
                            value={qaList[currentIndex].answer}
                            onChange={handleTextareaChange}
                            onKeyDown={handleKeyPress} // Add this line
                        />
                         {validationMessage && <div className="validation-message">{validationMessage}</div>} {/* Display the validation message if it exists */}
                    </div>
                )}
            </div>


        </div>

    )
}

export default Display
