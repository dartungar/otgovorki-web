import React, { useContext, useEffect } from "react";
import UpvoteButtonRow from "./UpvoteButtonRow";
import GeneratorContext from "../../context/generator/generatorContext";

const TextBox = () => {
  const generatorContext = useContext(GeneratorContext);
  const {
    settings,
    loadGeneratedOtgovorka,
    generatedOtgovorka,
    isLoading,
    isCopyMessageVisible,
    setCopyMessageVisible,
  } = generatorContext;

  useEffect(() => {
    loadGeneratedOtgovorka();
    // eslint-disable-next-line
  }, []);

  // on double click or touch event - copy text to clipboard and show special message
  function handleDoubleClickOrTouch() {
    navigator.clipboard.writeText(generatedOtgovorka.text);
    setCopyMessageVisible();
  }

  // show special message based on if text was copied recently
  // loader is emoji! varied sex based on what user chose in settings.
  return (
    <div className="text-box">
      <p
        className={`on-copy-message ${
          isCopyMessageVisible ? "visibility-visible" : "visibility-hidden"
        }`}
      >
        скопировано
      </p>
      {isLoading ? (
        <div className="loader-box">
          <span className="emoji-loader" role="img">
            {settings.sex.activeOption.value === "masc" ? "🤷‍♂️" : "🤷‍♀️"}
          </span>{" "}
        </div>
      ) : (
        <p
          className="main-text-row generated-text-row-animated"
          onDoubleClick={handleDoubleClickOrTouch}
          onTouchStart={handleDoubleClickOrTouch}
        >
          {generatedOtgovorka.text}
        </p>
      )}
      <UpvoteButtonRow />
    </div>
  );
};

export default TextBox;
