import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import './Main.css'
import { Context } from '../../context/Context'
import showdown from "showdown";
const Main = () => {
    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)
    const converter = new showdown.Converter();
    const html = converter.makeHtml(resultData);
  return (
    <div className="main">
        <div className="nav"><p>Cercalo</p></div>
        <div className="main-container">

            {!showResult
            ?<>
            <div className="greet">
                <p><span>Welcome To Cercalo</span></p>
                <p><span>The Search Engine of the Future.</span></p>
            </div>
                <div className="cards">
                    <div className="card">
                        <p>Cercalo Provides Website Links Based On Your Question, and Answers your Question at the Same Time.</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Ask Cercalo a Question!</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                onSent();
                                }
                            }}
                            value={input}
                            type="text"
                            placeholder="Search the web using Cercalo!"
                            />
                    </div>
                    
                </div>
            
            </>
            :<div className='result'>
                <div className="result-title">
                    <img src={assets.gemini_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    {loading?<><div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    </>:
                    <p dangerouslySetInnerHTML={{__html:html}}></p>
                    }
                </div>
            </div>
            }


            
        </div>
        {showResult
        ?<>  
        <div className="main-bottom">
            <div className="search-box">
            <input
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                    onSent();
                    }
                }}
                value={input}
                type="text"
                placeholder="Search the web using Cercalo!"
                />
            </div>
        </div>
        </>:null
        }

    </div>
  )
}

export default Main