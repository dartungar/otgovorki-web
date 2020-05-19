import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import SettingsColumn from "./SettingsColumn";

function SettingsBox(props) {
  const settingTypes = props.settingTypes;

  const [newSettings, setNewSettings] = useState();

  function updateSettings(newSettings) {
    setNewSettings(newSettings);
    props.onChangeSettings(newSettings);
  }

  function getColumnItems(settingTypeObj) {
    return props.settings.filter(item => item.settingTypeID === settingTypeObj.id);
  }

  return (
    <div className="settings-box container-fluid">
      <Form>
        <Form.Row>
        <Col  md={{span: 2, offset: 3}} sm={6}>
          <SettingsColumn
            items={getColumnItems(settingTypes[0])}
            title={settingTypes[0]["title"]}
            settings={props.settings}
            onChangeSettings={updateSettings}
          />
        </Col>
        <Col  md={2} sm={6}>
          <SettingsColumn
            items={getColumnItems(settingTypes[1])}
            title={settingTypes[1]["title"]}
            settings={props.settings}
            onChangeSettings={updateSettings}
          />
        </Col>
        <Col md={2} sm={6}>
          <SettingsColumn
            items={getColumnItems(settingTypes[2])}
            title={settingTypes[2]["title"]}
            settings={props.settings}
            onChangeSettings={updateSettings}
          />
            <SettingsColumn
            items={getColumnItems(settingTypes[3])}
            title={settingTypes[3]["title"]}
            settings={props.settings}
            onChangeSettings={updateSettings}
          />
        </Col>
        <Col  md={3} sm={6}></Col>
        </Form.Row>
      </Form>
    </div>
  );
}

export default SettingsBox;
