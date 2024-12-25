import React, { useContext, useState } from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {

    const [extend, setExtend] = useState(false)
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    function extendSidebar() {
        setExtend(!extend)
    }

    return (
        <div onClick={extendSidebar} className='sidebar'>
            <div className="top">
                <img className="menu" src={assets.menu_icon} alt="menu icon"></img>
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="Plus icon" />
                    {extend ? <p>New Chat</p> : null}
                </div>
                <div className="recent">
                    <p className='recent-title'>Recent</p>
                    {prevPrompts.map((item, index) => {
                        return (<div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                            <img src={assets.message_icon} alt="message icon" />
                            {extend ? <p>{item.slice(0, 18)}</p> : null}
                        </div>)
                    })}

                </div>
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Question icon" />
                    {extend ? <p>Help</p> : null}

                </div>

                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="History icon" />
                    {extend ? <p>History</p> : null}

                </div>


                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="setting icon" />
                    {extend ? <p>Settings</p> : null}


                </div>

            </div>



        </div >
    )
}

export default Sidebar