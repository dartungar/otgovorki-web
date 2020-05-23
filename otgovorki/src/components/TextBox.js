import React, {useState, useEffect} from "react";
import Spinner from "react-bootstrap/Spinner";

function TextBox(props) {
    const [text, setText] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isCopyMessageVisible, setIsCopyMessageVisible] = useState(false);

    useEffect(() => {
        setIsLoading(props.isLoading);
        setText(props.text);
    }, [props.isLoading, props.text]);

    useEffect(() => {
        if (isCopyMessageVisible) {
          setTimeout(() => {
            setIsCopyMessageVisible(false);
          }, 1000)
        }
      })

    function handleDoubleClickOrTouch() {
        navigator.clipboard.writeText(text);
        setIsCopyMessageVisible(true);
        console.log(isCopyMessageVisible);
    }

    console.log(props.isSexMale);

    return <div className="text-box">
                <p className={`on-copy-message ${isCopyMessageVisible ? "visibility-visible" : "visibility-hidden"}`}>скопировано</p>
                {isLoading 
                ? <div className="loader-box"><span className="emoji-loader" role="img">{props.isSexMale ? "🤷‍♂️" : "🤷‍♀️"}</span> </div>
                : 
                <p onDoubleClick={handleDoubleClickOrTouch} onTouchStart={handleDoubleClickOrTouch}>{text}</p>}
         
            </div> 
 
}

export default TextBox;