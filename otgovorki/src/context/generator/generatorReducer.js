import { SET_SETTINGS, TOGGLE_SETTINGS_VISIBILITY } from "../types";

const settingsReducer = (state, action) => {
  const { settings, isSettingsBoxVisible } = state;

  switch (action.type) {
    case SET_SETTINGS:
      console.log("reducing SET_SETTINGS", action.payload);
      const { setting, settingType } = action.payload;
      ///enable target setting & disable all others in its category (because radio buttons)
      const newSettings = {
        ...settings,
        [settingType]: {
          ...settings[settingType],
          activeOption: setting,
        },
      };
      console.log("new settings:", newSettings);
      return {
        ...state,
        settings: newSettings,
      };
    case TOGGLE_SETTINGS_VISIBILITY:
      return {
        ...state,
        isSettingsBoxVisible: !isSettingsBoxVisible,
      };
    default:
      return state;
  }
};

export default settingsReducer;
