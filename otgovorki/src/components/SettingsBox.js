import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
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
    <div className={`settings-box container-fluid ${props.isHidden && "visibility-hidden"}`}>
      <Form>
        <Form.Row>
        <Col  md={4} sm={6}>
          <SettingsColumn
            items={getColumnItems(settingTypes[0])}
            title={settingTypes[0]["title"]}
            settings={props.settings}
            onChangeSettings={updateSettings}
          />
        </Col>
        <Col  md={4} sm={6}>
          <SettingsColumn
            items={getColumnItems(settingTypes[1])}
            title={settingTypes[1]["title"]}
            settings={props.settings}
            onChangeSettings={updateSettings}
          />
        </Col>
        <Col md={4} sm={6}>
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
