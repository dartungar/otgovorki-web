import React, { useReducer } from "react";
import generatorContext from "./generatorContext";
import generatorReducer from "./generatorReducer";
import { defaultSettings } from "./defaultSettings";
import {
  SET_GENERATED_OTGOVORKA,
  SET_IS_LOADING,
  SET_IS_LOADING_FAILED,
  SET_SETTINGS,
  TOGGLE_SETTINGS_VISIBILITY,
  SET_COPY_MESSAGE_VISIBLE,
} from "../types";

const SettingsState = (props) => {
  const initialState = {
    isSettingsBoxVisible: false,
    settings: defaultSettings,
    isLoading: false,
    isLoadingFailed: false,
    generatedOtgovorka: {
      id: null,
      text: "",
    },
    isCopyMessageVisible: false,
  };

  const [state, dispatch] = useReducer(generatorReducer, initialState);

  // fetch otgovorka from API
  const loadGeneratedOtgovorka = () => {
    const { plausibility, theme, sex, tense } = state.settings;
    dispatch({ type: SET_IS_LOADING });
    fetch(
      // pass active settings as request url params
      `/api/generate/get?plausibility=${plausibility.activeOption.value}&theme=${theme.activeOption.value}&sex=${sex.activeOption.value}&tense=${tense.activeOption.value}`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: SET_GENERATED_OTGOVORKA,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({ type: SET_IS_LOADING_FAILED });
      });
  };

  const setCopyMessageVisible = () => {
    dispatch({ type: SET_COPY_MESSAGE_VISIBLE, payload: true });
    // нужно ли возвращать () => ?
    setTimeout(
      dispatch({ type: SET_COPY_MESSAGE_VISIBLE, payload: false }),
      1500
    );
  };

  // set active setting for a specific type
  const setSettings = ({ setting, settingType }) => {
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
        generatedOtgovorka: state.generatedOtgovorka,
        isCopyMessageVisible: state.isCopyMessageVisible,
        isLoading: state.isLoading,
        isLoadingFailed: state.isLoadingFailed,
        loadGeneratedOtgovorka,
        setSettings,
        toggleSettingsVisibility,
        setCopyMessageVisible,
      }}
    >
      {props.children}
    </generatorContext.Provider>
  );
};

export default SettingsState;
