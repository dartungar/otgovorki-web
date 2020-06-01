import React, {useState} from "react";
import {registerUpvote} from "../../utils";


function RankingItem(props) {
    const defaultButtonsState = {like: false, laugh: false, doubt: false};

    const [isButtonClicked, setButtonsState] = useState({defaultButtonsState});

    const upvoteTypes = {'like': 1, 'laugh': 2, 'doubt': 3};

    async function handleButtonClick(event) {
        const {name, disabled} = event.target;
        console.log(event.target, event.target.name, upvoteTypes[name]);
        setButtonsState(prevValue => {
            return {
                ...prevValue,
                [name]: true
            }
        });
        console.log(isButtonClicked);
        const newOtgovorka = await registerUpvote(props.otgovorka.id, props.otgovorka.content, upvoteTypes[name]);
        console.log('new otgovorka:', newOtgovorka)
        props.onUpdate(newOtgovorka)
    }

    return <div className="ranking-item">
            <p className="ranking-item-text">{props.otgovorka.content}</p>
            <div className="ranking-item-button-row">
                <span className="ranking-upvote-span">
                    <button className="ranking-upvote-btn" name="like" disabled={isButtonClicked['like']} onClick={handleButtonClick} title="неплохо!">👍</button>
                    <span className="ranking-upvote-number">{props.otgovorka.likes_count}</span>
                </span>
                <span className="ranking-upvote-span">
                    <button className="ranking-upvote-btn" name="laugh" disabled={isButtonClicked['laugh']} onClick={handleButtonClick} title="смешно!">🤣</button>
                    <span className="ranking-upvote-number">{props.otgovorka.laughs_count}</span>
                </span>
                <span className="ranking-upvote-span">
                    <button className="ranking-upvote-btn" name="doubt" disabled={isButtonClicked['doubt']} onClick={handleButtonClick} title="э-э-э...">🤔</button>
                    <span className="ranking-upvote-number">{props.otgovorka.doubts_count}</span>
                </span>
            </div>
           </div> 
}

export default RankingItem;