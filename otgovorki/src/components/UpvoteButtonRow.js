import React, {useState} from "react";
import Button from "react-bootstrap/Button";


function UpvoteButtonRow(props) {
    const [isButtonClicked, setButtonsState] = useState({
        like: false,
        laugh: false,
        confused: false
    })

    function handleButtonClick(event) {
        const {name, value} = event.target;
        setButtonsState(prevValue => {
            return {
                ...prevValue,
                [name]: true
            }
        });
        console.log(isButtonClicked);
    }

    return <div>
            <Button className="upvote-btn" disabled={isButtonClicked['like'] | props.isLoading} variant="outline-light" name="like" onClick={handleButtonClick}>👍</Button> 
            <Button className="upvote-btn" disabled={isButtonClicked['laugh'] | props.isLoading} variant="outline-light" name="laugh" onClick={handleButtonClick}>🤣</Button> 
            <Button className="upvote-btn" disabled={isButtonClicked['confused'] | props.isLoading} variant="outline-light" name="confused" onClick={handleButtonClick}>🤔</Button> 

           </div>

}

export default UpvoteButtonRow;