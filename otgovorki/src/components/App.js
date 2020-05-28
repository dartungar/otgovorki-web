import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import TextBox from "./TextBox";
import SettingsBox from "./SettingsBox";
import Header from "./Header";
import Footer from "./Footer";
import {settingsList, settingTypesList} from "./Settings";
import MainButtonRow from "./MainButtonRow";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";

function App() {
  // state
  const [text, setText] = useState("Еду я по выбоинам, по выбоинам да не выеду я. Шла Саша по шоссе и сосала сушки. Ехал Сталин через Сталин - видит Сталин: Сталин Сталин. ⬇");
  const [isLoading, setIsLoading] = useState(false);
  const [defaultSettings] = useState(settingsList);
  const [settingTypes] = useState(settingTypesList);
  const [settings, setSettings] = useState();
  const [isSettingsShown, setIsSettingsShown] = useState(false);
  const [isCopyMessageVisible, setIsCopyMessageVisible] = useState(false);

  // if no settings, use default settings
  if (!settings) {
    setSettings(defaultSettings);
  }

  // find active settings & send them to API as URI params
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

  // if sex is male, 'loader' emoji will be male, same for female
  // used in TextBox component
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

  // on click 'Refresh' button - get new otgovorka from API
  function handleClickOnRefreshOtgovorka() {
    var params = composeParameters();
    setIsLoading(true);
    fetch(
      // pass active settings as request url params
      `/api/get?plausibility=${params.plausibility}&theme=${params.theme}&sex=${params.sex}&tense=${params.tense}`,
        {
          method: "GET",
          mode: "cors",
        }
      )
      .then((res) => res.json())
      .then((data) => {
        // store new otgovorka in 'text' state variable
        setText(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // toggle settings visibility on & off
  function handleClickSettings() {
    setIsSettingsShown(prevVal => {
      return !prevVal;
    })
  }

  // catch changed settings from levels below
  // settings are changed in SettingsItem and passed up
  function handleChangeSettings(new_settings) {
    setSettings(new_settings);
  }

  // basic structure of the app
  // header, container for text, control buttons
  // settings, footer
  return (
    <div className="app-container d-flex flex-column">
      <Header/>
      <div className="main-container d-flex align-items-center flex-column justify-content-center">
        <TextBox isLoading={isLoading} text={text} isCopyMessageVisible={isCopyMessageVisible} isSexMale={isSexMale()}/>
        <MainButtonRow isLoading={isLoading} handleClickSubmit={handleClickOnRefreshOtgovorka} handleClickSettings={handleClickSettings}/>
        <SettingsBox settings={settings} settingTypes={settingTypes} isHidden={!isSettingsShown} onChangeSettings={handleChangeSettings}/>
      </div>
      <div>
        <Footer/>
      </div>  
    </div>
  );
}

export default App;
