import React, { useState, useContext } from "react";
import RankingContext from "../../context/ranking/rankingContext";
import ShareButton from "../layout/ShareButton";

function RankingItem(props) {
  const defaultButtonsState = { like: false, laugh: false, doubt: false };
  const rankingContext = useContext(RankingContext);
  const { registerUpvote, updateOtgovorkaValue } = rankingContext;

  const [isButtonClicked, setButtonsState] = useState({ defaultButtonsState });

  const upvoteTypes = { like: 1, laugh: 2, doubt: 3 };

  async function handleButtonClick(btnName) {
    setButtonsState((prevValue) => {
      return {
        ...prevValue,
        [btnName]: true,
      };
    });
    const updatedOtgovorka = await registerUpvote(
      props.otgovorka.id,
      props.otgovorka.content,
      upvoteTypes[btnName]
    );
    console.log(
      "updating otgovorka value from RankingItem component with ",
      updatedOtgovorka
    );
    updateOtgovorkaValue(updatedOtgovorka);
  }

  //console.log(props.isSorted);

  return (
    <div className={`ranking-item`}>
      <p className="ranking-item-text">{props.otgovorka.content}</p>
      <div className="ranking-item-button-row">
        <span className="ranking-upvote-span">
          <button
            className="ranking-upvote-btn"
            name="like"
            disabled={isButtonClicked["like"]}
            onClick={() => handleButtonClick("like")}
            title="правдоподобно!"
          >
            👍
          </button>
          <span className="ranking-upvote-number">
            {props.otgovorka.likes_count}
          </span>
        </span>
        <span className="ranking-upvote-span">
          <button
            className="ranking-upvote-btn"
            name="laugh"
            disabled={isButtonClicked["laugh"]}
            onClick={() => handleButtonClick("laugh")}
            title="смешно :)"
          >
            🤣
          </button>
          <span className="ranking-upvote-number">
            {props.otgovorka.laughs_count}
          </span>
        </span>
        <span className="ranking-upvote-span">
          <button
            className="ranking-upvote-btn"
            name="doubt"
            disabled={isButtonClicked["doubt"]}
            onClick={() => handleButtonClick("doubt")}
            title="э-э-э..."
          >
            🤔
          </button>
          <span className="ranking-upvote-number">
            {props.otgovorka.doubts_count}
          </span>
        </span>
        <ShareButton
          url="https://otgovorki.dartungar.com"
          text={props.otgovorka.content}
          isSmall={true}
        />
      </div>
    </div>
  );
}

export default RankingItem;
