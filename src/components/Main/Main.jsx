// import React, { useContext, useState } from 'react'
// import { Context } from '../../context/context'

import React, { useState, useContext } from 'react';
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from "../../context/Context";

const Main = () => {

    const { input, setInput, onSent, recentPrompt, showResult, loading, resultData } = useContext(Context)
    const [prompt, setPrompt] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSent(prompt);
        }
    };


    return (
        <div className='main'>
            <div className="nav">
                <p>Maximus</p>
                <img src={assets.user_icon} alt="profile_pic" />
            </div>


            <div className="main-container">
                {!showResult ? <>
                    <div className="greet">
                        <p><span>
                            Hello! Meridius</span>
                        </p>
                        <p>How can I help you today?</p>
                    </div>

                    <div className="cards">
                        <div className="card">
                            <p>Are you Planning for a world Tour</p>
                            <img src={assets.compass_icon} alt="compass icon" />
                        </div>

                        <div className="card">
                            <p>Need To cook any Recepie</p>
                            <img src={assets.bulb_icon} alt="bulb icon" />
                        </div>

                        <div className="card">
                            <p>Code websites with in Seconds</p>
                            <img src={assets.message_icon} alt="message icon" />
                        </div>

                        <div className="card">
                            <p>search Data through GenAI </p>
                            <img src={assets.code_icon} alt=" code icon" />
                        </div>
                    </div>
                </> : <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="user icon" />
                        <p>{recentPrompt}</p>
                        {/* // it shows the  prompt that user entered wich is originally in input state  before the answer*/}
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="gemini icon" />
                        {loading ?
                            <div className="loader">
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>}

                        {/* //resultData is the response that we get from the Gemini model */}
                    </div>
                </div>

                }


                <div className="main-bottom">
                    <div className="chatbox">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text"
                            placeholder='Enter a Prompt Here'
                            onKeyDown={handleKeyPress}
                        // Response after clickig Enterkey on keyboard
                        />
                        <div>
                            <img onClick={() => onSent(prompt)} src={assets.send_icon} alt="send icon" />
                        </div>
                    </div>
                    <p className="bottom-info">
                        You can ask me anything, I am here to help you
                        <p>©loned by Jaswanth</p>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main