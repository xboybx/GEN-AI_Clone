import React, { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');  // input state the prompt that user will enter will be saved here
    const [recentPrompt, setRecentPrompt] = useState(''); // recent prompt that user entered will be saved here i.e., the input var is moved in this var
    const [prevPrompts, setPrevPrompts] = useState([]); // all the prompts that user entered will be saved here
    const [resultData, setResultData] = useState(''); // response that we get from the Gemini model will be saved here
    const [showResult, setShowResult] = useState(false); // this will be used to show the result on the screen
    const [loading, setLoading] = useState(false); // this will be used to show the loading screen

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {



        setResultData(""); // it removes any previous result or prompt and resets the chat box or response box
        setLoading(true);
        setShowResult(true);

        let response;

        if (prompt !== "") {
            response = await run(prompt); // This will work when we click items in recent in Sidebar
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts((prev) => {
                return [...prev, input]; //this is to generate all normal responses from gemini model
            });
            setRecentPrompt(input);
            response = await run(input);// it sets the recent prompt that user entered
        }


        // Logic for highlighting the side headings in the response
        let responseArray = response.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<br><b>" + responseArray[i] + "</br></b>";//To differnciate headings and content in imcoming response from model
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];//keyboard type effect for response
            delayPara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("")// it resets the input box
    };

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        resultData,
        setResultData,
        showResult,
        setShowResult,
        loading,
        setLoading,
        onSent,
        newChat

    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;













