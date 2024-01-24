import React from 'react'
import { QAcontext } from '../createContext/createContext'
import { useContext } from 'react'
import Display from '../Display/Display'
import './page.css'


function Page() {
    const { qaList, handleNextClick, currentQA, handleBackClick, currentIndex, handleSubmit } = useContext(QAcontext);
    return (
        <div className='feedbackmain'>
            <div className='feedback_inner'>
                <div className='heading'>
                    <div className='head'>
                        We Want Your Brain
                    </div>

                </div>
                <div className='subheading'><div className='sub'>Your feedback shapes our future. Share your thoughts to make a lasting impact!</div></div>
            </div>

            <div className='path'>

                <div className='path'>
                    {/* Loop to create circles and dotted lines */}
                    {[...Array(7)].map((_, index) => (
                        <React.Fragment key={index}>
                            <div className={`circle ${index <= currentIndex-1 ? 'active' : ''}`}>
                                <div className={`checkmark ${index <= currentIndex-1 ? 'active_check' : ''}`}></div>
                            </div>
                            {index < 6 && (
                                <div className={`dotted_line ${index < currentIndex? 'active_dotted' : ''}`} id={index + 1}></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className='path_inner'>

                </div>



            </div>
            {currentIndex <= 6 ? <div className='display_main'>
                <Display />
            </div> : <div className='message'><div className='message_inner'>Your feedback means a lot to us. Thank you!</div></div>}
            <div className='buttons'>
                {currentIndex != 0 ? <div className='back'><button onClick={handleBackClick}>Back</button></div> : ""}
                <div className='next'>{currentIndex > 6 ? <button onClick={handleSubmit}>Submit</button> : <button onClick={handleNextClick}>Next</button>}</div>
            </div>

        </div>
    )
}

export default Page
