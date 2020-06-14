import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import SettingsColumn from "./SettingsColumn";
import SettingsContext from "../../context/settings/settingsContext";

const SettingsBox = () => {
  const settingsContext = useContext(SettingsContext);
  const { settings, settingsTypes } = settingsContext;

  // types of settings, for generating custom columns of setting items
  // columns are not uniform so we can't simply map() settings

  // get items for generating column of settings items
  // using settings type
  function getColumnItems(settingTypeObj) {
    return settings.filter((item) => item.settingTypeID === settingTypeObj.id);
  }

  // generate settings columns
  // columns are not uniform (last 2 are short and stacked) so we can't generate them with map()
  return (
    <div className="settings-box container-fluid">
      <Form>
        <Form.Row>
          <Col md={4} sm={6}>
            <SettingsColumn
              items={getColumnItems(settingsTypes[0])}
              title={settingsTypes[0]["title"]}
            />
          </Col>
          <Col md={4} sm={6}>
            <SettingsColumn
              items={getColumnItems(settingsTypes[1])}
              title={settingsTypes[1]["title"]}
            />
          </Col>
          <Col md={4} sm={6}>
            <SettingsColumn
              items={getColumnItems(settingsTypes[2])}
              title={settingsTypes[2]["title"]}
            />
            <SettingsColumn
              items={getColumnItems(settingsTypes[3])}
              title={settingsTypes[3]["title"]}
            />
          </Col>
          <Col md={3} sm={6}></Col>
        </Form.Row>
      </Form>
    </div>
  );
};

export default SettingsBox;
