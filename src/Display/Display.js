import React from 'react'
import './Display.css'
import { useContext, useState } from 'react'
import { QAcontext } from '../createContext/createContext'
import '../../node_modules/rsuite/dist/rsuite.css';
import { Slider } from 'rsuite';
function Display() {
    const { display_qaList, handleNextClick, currentQA, qaList, setQaList, currentIndex, selectedDiv, setSelectedDiv, validationMessage, setValidationMessage } = useContext(QAcontext)
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

    // const handleSliderTouch = (e) => {
    //     // Get touch details
    //     const touch = e.touches[0];
    //     const slider = e.currentTarget;

    //     // Calculate the touch position relative to the slider
    //     const touchPosition = (touch.clientX - slider.getBoundingClientRect().left) / slider.offsetWidth;

    //     // Calculate the new value based on touch position
    //     // Assuming the slider's min is 10, max is 100
    //     const newValue = 5 + touchPosition * (60 - 10);
    //     const intValue = Math.round(newValue);
    //     // Update the slider's value
    //     handleTextareaChange(intValue);
    // };
    const handleSliderTouch = (e) => {
        // Get touch details
        const touch = e.touches[0];
        const slider = e.currentTarget;
    
        // Calculate the touch position relative to the slider
        const touchPosition = (touch.clientX - slider.getBoundingClientRect().left) / slider.offsetWidth;
    
        // Calculate the new value based on touch position
        // Assuming the slider's min is 5, max is 60
        let newValue = 5 + touchPosition * (65 - 5);
    
        // Limit the newValue to the range 5 to 60
        newValue = Math.max(5, Math.min(newValue, 65));
    
        const intValue = Math.round(newValue);
        
        // Update the slider's value
        handleTextareaChange(intValue);
    };
    


    const handleClick = (selectedAnswer, index) => {
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
        // const updatedAnswer = e.target.value;
        const newQaList = qaList.map((item, index) => {
            if (index === currentIndex) {
                return { ...item, answer: e };
            }
            return item;
        });
        setQaList(newQaList);
    };
    // Determine if the custom style should be applied
    const customStyle = [1].includes(currentIndex) ? { width: '80vw', height: '18vh', gap: "3vw" } : { width: '80vh', height: '28vh' };

    const handleBarClick = (value) => {
        // Update the slider's value
        handleTextareaChange(value);
    };
    

    return (
        <div className='display' style={customStyle}>
            <div className='display_question'>
                <h2 className='display_question_inner'>{currentQA.question}</h2>
            </div>
            <div className='display_question_inner'>
                {currentQA.image ? (
                    <div className='display_image'>
                        {currentQA.image.map((img, index) => (
                            <div key={index} className='button' onClick={() => {
                                handleClick(currentQA.display_names[index], index);
                                handleNextClick();
                            }} style={{ opacity: selectedDiv === -1 || selectedDiv === index ? 1 : 0.5 }} >
                                <img src={img} alt={currentQA.display_names[index]} />
                                <span className="names">{currentQA.display_names[index]}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='display_textarea'>

                        {/* <textarea
                            placeholder="Your answer"
                            value={qaList[currentIndex].answer}
                            onChange={handleTextareaChange}
                            onKeyDown={handleKeyPress} // Add this line
                        /> */}
                        <div className='agehead'><h2>Age:<span className='agenum'>{qaList[currentIndex].answer}</span></h2></div>
                        <div  className="sliderRange" style={{
                            display: 'block', width: 600, paddingLeft: 30
                        }}>
                            <Slider
                                max={65}
                                min={5}
                                // step={10}
                                defaultValue={33}
                                // graduated
                                value={qaList[currentIndex].answer}
                                progress
                                onChange={handleTextareaChange}
                                onTouchMove={handleSliderTouch} // Handle touch move on the slider
                            />
                            <div className='barmain'>
                                <span className='bar' onClick={() => handleBarClick(5)}></span>
                                <span className='bar'id='bar2' onClick={() => handleBarClick(20)}></span>
                                <span className='bar' id='bar3' onClick={() => handleBarClick(35)}></span>
                                <span className='bar' id='bar4' onClick={() => handleBarClick(50)}></span>
                                <span className='bar' id='bar5' onClick={() => handleBarClick(65)}></span>
                                

                            </div>
                            
                        </div>
                        {validationMessage && <div className="validation-message">{validationMessage}</div>} {/* Display the validation message if it exists */}
                    </div>
                )}
            </div>


        </div>

    )
}

export default Display
