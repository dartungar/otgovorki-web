import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import SettingsColumn from "./SettingsColumn";
import GeneratorContext from "../../context/generator/generatorContext";

const SettingsBox = () => {
  const generatorContext = useContext(GeneratorContext);
  const { settings } = generatorContext;

  // generate settings columns
  // columns are not uniform (last 2 are short and stacked) so we can't generate them with map()
  return (
    <div className="settings-box container-fluid">
      <Form>
        <Form.Row>
          <Col md={4} sm={6}>
            <SettingsColumn setting={settings.plausibility} />
          </Col>
          <Col md={4} sm={6}>
            <SettingsColumn setting={settings.theme} />
          </Col>
          <Col md={4} sm={6}>
            <SettingsColumn setting={settings.sex} />
            <SettingsColumn setting={settings.tense} />
          </Col>
          <Col md={3} sm={6}></Col>
        </Form.Row>
      </Form>
    </div>
  );
};

export default SettingsBox;
