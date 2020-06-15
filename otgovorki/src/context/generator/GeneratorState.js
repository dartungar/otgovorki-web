import React, { useReducer } from "react";
import generatorContext from "./generatorContext";
import generatorReducer from "./generatorReducer";
import { defaultSettings } from "./defaultSettings";
import { SET_SETTINGS, TOGGLE_SETTINGS_VISIBILITY } from "../types";

const SettingsState = (props) => {
  const initialState = {
    isSettingsBoxVisible: false,
    settings: defaultSettings,
  };

  const [state, dispatch] = useReducer(generatorReducer, initialState);

  // fetch generated otgovorka from API

  // set

  // change settings
  const setSettings = ({ setting, settingType, isActive }) => {
    console.log("attempting to change settings...");
    dispatch({
      type: SET_SETTINGS,
      payload: { setting: setting, settingType: settingType },
    });
  };

  // make settings container visible or vice versa
  const toggleSettingsVisibility = () => {
    dispatch({ type: TOGGLE_SETTINGS_VISIBILITY });
  };

  return (
    <generatorContext.Provider
      value={{
        isSettingsBoxVisible: state.isSettingsBoxVisible,
        settings: state.settings,
        setSettings,
        toggleSettingsVisibility,
      }}
    >
      {props.children}
    </generatorContext.Provider>
  );
};

export default SettingsState;
