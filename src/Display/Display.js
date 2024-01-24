import React from 'react'
import './Display.css'
import { useContext, useState } from 'react'
import { QAcontext } from '../createContext/createContext'
function Display() {
    const { display_qaList, handleNextClick, currentQA, qaList, setQaList, currentIndex,selectedDiv,setSelectedDiv } = useContext(QAcontext)
    

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
      const customStyle = [1, 5, 6].includes(currentIndex) ? { width: '821px', height: '266px' } : {width:'821px',height:'354px'};



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
                        />
                    </div>
                )}
            </div>


        </div>

    )
}

export default Display
