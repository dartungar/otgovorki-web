import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import ShareButton from "../layout/ShareButton";
import InfoPopover from "./InfoPopover";
import { FaCog, FaRedoAlt, FaQuestion } from "react-icons/fa";
import GeneratorContext from "../../context/generator/generatorContext";

function MainButtonRow(props) {
  const generatorContext = useContext(GeneratorContext);
  const {
    toggleSettingsVisibility,
    loadGeneratedOtgovorka,
    isLoading,
    generatedOtgovorka,
  } = generatorContext;

  // buttons
  // left to right
  // "?" button has popover with info
  return (
    <div className="button-row d-flex flex-row">
      <Button
        className="custom-btn custom-btn-outline"
        variant="outline-secondary"
        title="Настройки"
        onClick={toggleSettingsVisibility}
      >
        <FaCog />
      </Button>
      <Button
        className="custom-btn custom-btn-filled"
        variant="dark"
        title="Обновить"
        disabled={isLoading}
        onClick={loadGeneratedOtgovorka}
      >
        <FaRedoAlt />
      </Button>
      <InfoPopover>
        <Button
          className="custom-btn custom-btn-outline copy-btn"
          variant="outline-secondary"
          title="Справка"
        >
          <FaQuestion />
        </Button>
      </InfoPopover>
      <ShareButton
        url="https://otgovorki.dartungar.com"
        text={generatedOtgovorka.text}
        isSmall={false}
      />
    </div>
  );
}

export default MainButtonRow;
