import React, {useState, useEffect} from "react";
import UpvoteButtonRow from "./UpvoteButtonRow";


function TextBox(props) {
    // states
    // current value of the text
    const [otgovorka, setOtgovorka] = useState();
    // is text loading. affects showing loader
    const [isLoading, setIsLoading] = useState(false);
    // if text was recently copied, we will show special message
    const [isCopyMessageVisible, setIsCopyMessageVisible] = useState(false);

    // set states based on what App.js passed to us
    useEffect(() => {
        setIsLoading(props.isLoading);
        setOtgovorka(props.otgovorka);
    }, [props.isLoading, props.text]);

    // if 'text was copied' message is visible, fade it out
    useEffect(() => {
        if (isCopyMessageVisible) {
          setTimeout(() => {
            setIsCopyMessageVisible(false);
          }, 1000)
        }
      })

    // on double click or touch event - copy text to clipboard and show special message
    function handleDoubleClickOrTouch() {
        navigator.clipboard.writeText(props.otgovorka.content);
        setIsCopyMessageVisible(true);
        console.log(isCopyMessageVisible);
    }

    // show special message based on if text was copied recently
    // loader is emoji! varied sex based on what user chose in settings.
    return <div className="text-box">
                <p className={`on-copy-message ${isCopyMessageVisible ? "visibility-visible" : "visibility-hidden"}`}>скопировано</p>
                {isLoading 
                ? <div className="loader-box"><span className="emoji-loader" role="img">{props.isSexMale ? "🤷‍♂️" : "🤷‍♀️"}</span> </div>
                : 
                <p className="main-text-row" onDoubleClick={handleDoubleClickOrTouch} onTouchStart={handleDoubleClickOrTouch}>{props.otgovorka.content}</p>
                }
                <UpvoteButtonRow isLoading={isLoading} otgovorka={otgovorka}/>       
            </div> 
            
 
}

export default TextBox;