import { createContext, useState } from "react";
import run from "../config/gemini";
export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState(""); {/*Original Input*/}
    const [recentPrompt,setRecentPrompt] = useState(""); {/*Which is then saved into Recent Prompt*/}
    const[prevPrompts, setPrevPrompts] = useState([]); {/*Previous Prompt Array to store*/}
    const [showResult,setShowResult] = useState(false); {/*Once True Hides Boxes then Display Result*/}
    const [loading,setLoading] = useState(false); {/*Loading Animation, once prompt is recieved make false*/}
    const [resultData,setResultData] = useState(""); {/*Data to show pagee*/}

    const delayPara =  (index,nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord)
        },75*index)
    }
    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        const response = await run(input)

        let responseArray = response.split(" ")
        for(let i=0; i<responseArray.length;i++)
        {
            const nextWord = responseArray[i];
            delayPara(i,nextWord+" ")
        }
        setLoading(false)
        setInput("")

    }

    

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider