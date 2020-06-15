import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import InfoPopover from "./InfoPopover";
import { FaCog, FaRedoAlt, FaQuestion } from "react-icons/fa";
import GeneratorContext from "../../context/generator/generatorContext";

function MainButtonRow(props) {
  const generatorContext = useContext(GeneratorContext);

  // buttons
  // left to right
  // "?" button has popover with info
  return (
    <div className="button-row d-flex flex-row">
      <Button
        className="custom-btn custom-btn-outline"
        variant="outline-secondary"
        title="Настройки"
        disabled={props.isLoading}
        onClick={generatorContext.toggleSettingsVisibility}
      >
        <FaCog />
      </Button>
      <Button
        className="custom-btn custom-btn-filled"
        variant="dark"
        title="Обновить"
        disabled={props.isLoading}
        onClick={props.handleClickSubmit}
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
    </div>
  );
}

export default MainButtonRow;
