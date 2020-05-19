import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import TextBox from "./TextBox";
import SettingsBox from "./SettingsBox";
import {settingsList, settingTypesList} from "../Settings";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [defaultSettings, setDefaultSettings] = useState(settingsList);
  const [settingTypes, setSettingTypes] = useState(settingTypesList);
  const [settings, setSettings] = useState();
  const [isSettingsShown, setIsSettingsShown] = useState(false);
  const [adequacyLevel, setAdequacyLevel] = useState(1);

  if (!settings) {
    setSettings(defaultSettings);
  }

  function composeParameters() {
    const params = {
      plausibility: settings.filter(
        (item) => {return item.isActive && item.settingTypeID ===1 }
      )[0]["value"],
      theme: settings.filter((item) => {return item.isActive && item.settingTypeID === 2 })[0]["value"],
      sex: settings.filter((item) => {return item.isActive && item.settingTypeID === 3 })[0]["value"],
      tense: settings.filter((item) => {return item.isActive && item.settingTypeID === 4 })[0]["value"],
    };
    console.log(params);
    return params;
  }


  function handleClickSubmit() {
    var params = composeParameters();
    setIsLoading(true);
    fetch(
      `http://localhost:5000/api/get?plausibility=${params.plausibility}&theme=${params.theme}&sex=${params.sex}&tense=${params.tense}`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setText(data);
        setIsLoading(false);
      });
  }

  function handleClickSettings() {
    setIsSettingsShown(prevVal => {
      return !prevVal;
    })
  }

  // попробовать со спредом
  function handleChangeSettings(new_settings) {
    setSettings(new_settings);
    console.log(settings);
  }


  return (
    <div>
      <div className="text-container container-lg">
        <h3>...</h3>
        <TextBox isLoading={isLoading} text={text}/>
        <Button
          className="refresh-btn"
          variant="outline-secondary"
          disabled={isLoading}
          onClick={handleClickSettings}
        >
          Настройки
        </Button>
        <Button
          className="refresh-btn"
          variant="dark"
          disabled={isLoading}
          onClick={handleClickSubmit}
        >
          Обновить
        </Button>
        {isSettingsShown &&
          <SettingsBox settings={settings} settingTypes={settingTypes} onChangeSettings={handleChangeSettings}/>
          }
        
      </div>
    </div>
  );
}

export default App;
