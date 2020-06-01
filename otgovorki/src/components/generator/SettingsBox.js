import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import SettingsColumn from "./SettingsColumn";

function SettingsBox(props) {
  // types of settings, for generating custom columns of setting items
  // columns are not uniform so we can't simply map() settings 
  const settingTypes = props.settingTypes;

  // intermediate container for newSettings changed in SettingsItem.js
  const [newSettings, setNewSettings] = useState();
  
  // send changed settings up to App.js
  function updateSettings(newSettings) {
    setNewSettings(newSettings);
    props.onChangeSettings(newSettings);
  }

  // get items for generating column of settings items 
  // using settings type
  function getColumnItems(settingTypeObj) {
    return props.settings.filter(item => item.settingTypeID === settingTypeObj.id);
  }

  // generate settings columns
  // columns are not uniform (last 2 are short and stacked) so we can't generate them with map()
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
