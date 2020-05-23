import React from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function InfoPopover(props) {
    const popover = (
        <Popover id="info-popover">
            <Popover.Title as="h3">Генератор отговорок</Popover.Title>
            <Popover.Content>
                <p>🔄 - сгенерировать отговорку</p>
                <p>⚙ - настройки:</p>
                <p>  адекватность (реалистично / не очень / бред)</p>
                <p>  тема</p>
                <p>  ваш пол ("извини, я забыл(а) ...")</p>
                <p>  время ("извини, не получилось, был ... / извини, не получится, буду ...")</p>
            </Popover.Content>
        </Popover>
    );

    return <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>{props.children}</OverlayTrigger>

}

export default InfoPopover;