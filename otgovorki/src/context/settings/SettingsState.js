import React, { useReducer } from "react";
import settingsContext from "./settingsContext";
import settingsReducer from "./settingsReducer";
import { defaultSettings, settingTypes } from "./defaultSettings";
import { SET_SETTINGS, TOGGLE_SETTINGS_VISIBILITY } from "../types";

const SettingsState = (props) => {
  const initialState = {
    isVisible: false,
    settings: defaultSettings,
    settingsTypes: settingTypes,
  };

  const [state, dispatch] = useReducer(settingsReducer, initialState);

  // change settings
  const setSettings = ({ id, settingTypeID, isActive }) => {
    if (!isActive) {
      dispatch({
        type: SET_SETTINGS,
        payload: { id: id, settingTypeID: settingTypeID },
      });
    }
  };

  // make settings container visible or vice versa
  const toggleSettingsVisibility = () => {
    dispatch({ type: TOGGLE_SETTINGS_VISIBILITY });
  };

  return (
    <settingsContext.Provider
      value={{
        isVisible: state.isVisible,
        settings: state.settings,
        settingsTypes: state.settingsTypes,
        setSettings,
        toggleSettingsVisibility,
      }}
    >
      {props.children}
    </settingsContext.Provider>
  );
};

export default SettingsState;
