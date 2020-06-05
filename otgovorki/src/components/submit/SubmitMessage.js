import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import {FaRedoAlt} from "react-icons/fa"

function SubmitMessage(props) {
    const [buttonTitle, setButtonTitle] = useState();

    useEffect(() => {
        if (props.isSubmittSuccessful) {
            setButtonTitle("Предложить ещё");
        } else {
            setButtonTitle("Попробовать ещё раз");
        }
    })

    function handleRefreshButtonClick() {
        window.location.reload();
    }

    return <div >
            {props.isSubmittSuccessful ? 
                <p className="submit-success-message">Получили вашу отговорку. Спасибо!</p>
                :
                <p className="submit-error-message">Отговорка не дошла :( <br/> Попробуйте ещё раз!</p>
            }
            <Button
                className="custom-btn custom-btn-filled"
                variant="dark"
                onClick={handleRefreshButtonClick}
                title={buttonTitle}
                >
                    <FaRedoAlt/> 
            </Button>
            </div>
}

export default SubmitMessage;