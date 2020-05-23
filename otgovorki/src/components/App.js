import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import TextBox from "./TextBox";
import SettingsBox from "./SettingsBox";
import Header from "./Header";
import Footer from "./Footer";
import {settingsList, settingTypesList} from "./Settings";
import ButtonRow from "./ButtonRow";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";

function App() {
  const [text, setText] = useState("сгенерировать ⬇");
  const [isLoading, setIsLoading] = useState(false);
  const [defaultSettings] = useState(settingsList);
  const [settingTypes] = useState(settingTypesList);
  const [settings, setSettings] = useState();
  const [isSettingsShown, setIsSettingsShown] = useState(false);
  const [isCopyMessageVisible, setIsCopyMessageVisible] = useState(false);


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

  function isSexMale() {
    if (!settings) {
      return true;
    } else {
      const sex = settings.filter((item) => {return item.isActive && item.settingTypeID === 3 })[0]["value"];
      if (sex === 'masc') {
        return true;
      } else {return false} 
    }
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

  function handleChangeSettings(new_settings) {
    setSettings(new_settings);
  }


  return (
    <div className="app-container d-flex flex-column">
      <Header/>
      <div className="main-container d-flex align-items-center flex-column justify-content-center">
        <TextBox isLoading={isLoading} text={text} isCopyMessageVisible={isCopyMessageVisible} isSexMale={isSexMale()}/>
        <ButtonRow isLoading={isLoading} handleClickSubmit={handleClickSubmit} handleClickSettings={handleClickSettings}/>
        <SettingsBox settings={settings} settingTypes={settingTypes} isHidden={!isSettingsShown} onChangeSettings={handleChangeSettings}/>
      </div>
      <div><Footer/></div>
        
    </div>
  );
}

export default App;
