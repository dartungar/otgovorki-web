import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import GeneratorContext from "../../context/generator/generatorContext";
import RankingContext from "../../context/ranking/rankingContext";

const UpvoteButtonRow = () => {
  const generatorContext = useContext(GeneratorContext);
  const { generatedOtgovorka, isLoading, isLoadingFailed } = generatorContext;

  const rankingContext = useContext(RankingContext);
  const { registerUpvote } = rankingContext;

  const defaultButtonsState = { like: false, laugh: false, doubt: false };

  const [isButtonClicked, setButtonsState] = useState({ defaultButtonsState });

  const upvoteTypes = { like: 1, laugh: 2, doubt: 3 };

  useEffect(() => {
    if (isLoading) {
      setButtonsState(defaultButtonsState);
    }
    // eslint-disable-next-line
  }, [isLoading]);

  function handleButtonClick(event) {
    const { name } = event.target;
    setButtonsState((prevValue) => {
      return {
        ...prevValue,
        [name]: true,
      };
    });
    registerUpvote(
      generatedOtgovorka.id,
      generatedOtgovorka.text,
      upvoteTypes[name]
    );
  }

  return (
    <div className="upvote-btn-row-container">
      <Button
        className="upvote-btn"
        disabled={isButtonClicked["like"] || isLoading || isLoadingFailed}
        variant="outline-light"
        name="like"
        title="Правдоподобно!"
        onClick={handleButtonClick}
      >
        👍
      </Button>
      <Button
        className="upvote-btn"
        disabled={isButtonClicked["laugh"] || isLoading || isLoadingFailed}
        variant="outline-light"
        name="laugh"
        title="Смешно :)"
        onClick={handleButtonClick}
      >
        🤣
      </Button>
      <Button
        className="upvote-btn"
        disabled={isButtonClicked["doubt"] || isLoading || isLoadingFailed}
        variant="outline-light"
        name="doubt"
        title="Э-э-э..."
        onClick={handleButtonClick}
      >
        🤔
      </Button>
    </div>
  );
};

export default UpvoteButtonRow;
