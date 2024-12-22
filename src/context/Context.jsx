import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();



const ContextProvider = (props) => {

    const [input, setInput] = useState('')  // input state the propmt that user will enter will be saved here
    const [recentPrompt, setRecentPrompt] = useState('') // recent prompt that user entered will be saved here ie the input var is moved in this var
    const [prevPrompts, setPrevPrompts] = useState([]) // all the prompts that user entered will be saved here
    const [resultData, setResultData] = useState('') // response that we get from the Gemini model will be saved here
    const [showResult, setShowResult] = useState(false) // this will be used to show the result on the screen
    const [loading, setLoading] = useState(false) // this will be used to show the loading screen


    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord)
        }, 75 * index)
    }


    const onSent = async (Prompt) => {
        setResultData("") //it removes any previous result or prompt and reset the chat box or response box
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input) // it sets the recent prompt that user entered
        const response = await run(input)
        // Logic for highlighting the side headings in the response
        let responseArray = response.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<br><b>" + responseArray[i] + "</br></b>"
            }
        }


        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }


        // setResultData(response)// it sets the response that we get from the model in the resultData state
        // setResultData(newResponse2)
        setLoading(false)//it show data thus loading is false
        setInput("")// it resets the input box
    }




    const contextVlaue = {
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
        onSent
    }

    return (
        <Context.Provider value={contextVlaue}>
            {props.children}
        </Context.Provider>
    )
}


export default ContextProvider;