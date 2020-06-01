import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import {registerUpvote} from "../../utils";


function UpvoteButtonRow(props) {
    console.log(props.otgovorka);
    const defaultButtonsState = {like: false, laugh: false, doubt: false};

    const [isButtonClicked, setButtonsState] = useState({defaultButtonsState});

    const upvoteTypes = {'like': 1, 'laugh': 2, 'doubt': 3};

    useEffect(() => {
        if (!props.isLoading) {
            setButtonsState(defaultButtonsState);
        }
    }, [props.isLoading])


    function handleButtonClick(event) {
        const {name, value} = event.target;
        setButtonsState(prevValue => {
            return {
                ...prevValue,
                [name]: true
            }
        });
        registerUpvote(props.otgovorka.id, props.otgovorka.content, upvoteTypes[name]);
    }

    return <div className="upvote-btn-row-container">
                <Button 
                    className="upvote-btn" 
                    disabled={isButtonClicked['like'] | props.isLoading} 
                    variant="outline-light" 
                    name="like" 
                    title="Неплохо!"
                    onClick={handleButtonClick}>
                👍
                </Button> 
                <Button 
                    className="upvote-btn" 
                    disabled={isButtonClicked['laugh'] | props.isLoading} 
                    variant="outline-light" 
                    name="laugh" 
                    title="Смешно!"
                    onClick={handleButtonClick}>
                🤣
                </Button> 
                <Button 
                    className="upvote-btn" 
                    disabled={isButtonClicked['doubt'] | props.isLoading} 
                    variant="outline-light" 
                    name="doubt" 
                    title="Э-э-э..."
                    onClick={handleButtonClick}>
                🤔
                </Button> 
           </div>

}

export default UpvoteButtonRow;