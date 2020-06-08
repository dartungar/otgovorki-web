import React from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {FaCog, FaRedoAlt} from "react-icons/fa"


function InfoPopover(props) {
    const popover = (
        <Popover id="info-popover">
            <Popover.Title><span className="info-popover-title">Генератор отговорок</span></Popover.Title>
            <Popover.Content>
                <p><FaRedoAlt/> - сгенерировать отговорку</p>
                <p><FaCog/> - настройки:</p>
                <p className="info-popover-indented-bullets">  адекватность (реалистично / не очень / бред)</p>
                <p className="info-popover-indented-bullets">  тема</p>
                <p className="info-popover-indented-bullets">  ваш пол ("извини, я забыл(а) ...")</p>
                <p className="info-popover-indented-bullets">  время ("извини, не получилось, был ... / извини, не получится, буду ...")</p>
            </Popover.Content>
        </Popover>
    );

    return <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>{props.children}</OverlayTrigger>

}

export default InfoPopover;