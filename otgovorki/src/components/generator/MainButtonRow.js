import React from "react";
import Button from "react-bootstrap/Button";
import InfoPopover from "./InfoPopover";
import {FaCog, FaRedoAlt, FaQuestion} from "react-icons/fa"

function MainButtonRow(props) {

    // buttons
    // left to right
    // "?" button has popover with info
    return <div className="button-row d-flex flex-row">
        <Button
        className="custom-btn custom-btn-outline"
        variant="outline-secondary"
        disabled={props.isLoading}
        onClick={props.handleClickSettings}
        >
            <FaCog/>
        </Button>
        <Button
        className="custom-btn custom-btn-filled"
        variant="dark"
        disabled={props.isLoading}
        onClick={props.handleClickSubmit}
        >
            <FaRedoAlt/>
        </Button>
        <InfoPopover>
            <Button 
            className="custom-btn custom-btn-outline copy-btn" 
            variant="outline-secondary">
                <FaQuestion/>
            </Button>
        </InfoPopover>

  </div>
}

export default MainButtonRow;