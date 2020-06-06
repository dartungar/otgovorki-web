import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SubmitMessage from "./SubmitMessage";

function Submit() {

    const [text, setText] = useState("");
    const [isSubmitted, setIsSubmitted] = useState();
    const [isSubmittSuccessful, setIsSubmitSuccessful] = useState();

    function handleChange(event) {
        setText(event.target.value);
    }

    function handleClick(event) {
        event.preventDefault();
        console.log(text);
        fetch(
            '/api/submit/post',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'content': text})
            })
            .then(response => response.json())
            .then(data => {
                console.log('Submit registered!', data);
                setText("");
                setIsSubmitted(true);
                setIsSubmitSuccessful(true);
            })
            .catch(error => {
                console.log('Error registering upvote: ', error);
                setIsSubmitted(true);
                setIsSubmitSuccessful(false);
            });
    }

    return <div className="submit-container">
            {isSubmitted ? <SubmitMessage isSubmittSuccessful={isSubmittSuccessful}/> :
                <Form>
                    <Form.Control className="text-area-submit" as="textarea" rows="4" placeholder="Предложите отговорку. Постарайтесь без грубостей!" onChange={handleChange} value={text}/>
                    <Button className="submit-btn" type="submit" onClick={handleClick}>Отправить</Button>
                </Form>            
            }

           </div>
}

export default Submit;