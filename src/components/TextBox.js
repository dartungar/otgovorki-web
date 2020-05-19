import React, {useState, useEffect} from "react";
import Spinner from "react-bootstrap/Spinner";

function TextBox(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState();

    useEffect(() => {
        setIsLoading(props.isLoading);
        setText(props.text);
    }, [props.isLoading, props.text]);

    return <p className="text-box">
          {isLoading ? <Spinner animation="border" size="md" variant="info" /> : text}
    </p>  
}

export default TextBox;