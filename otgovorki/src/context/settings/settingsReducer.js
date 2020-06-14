import { SET_SETTINGS, TOGGLE_SETTINGS_VISIBILITY } from "../types";

const settingsReducer = (state, action) => {
  const { settings, isVisible } = state;

  switch (action.type) {
    case SET_SETTINGS:
      const { id, settingTypeID } = action.payload;
      // enable target setting & disable all others in its category (because radio buttons)
      const newSettings = settings.map((setting) => {
        if (setting.settingTypeID === settingTypeID) {
          if (setting.id === id) {
            setting.isActive = true;
          } else {
            setting.isActive = false;
          }
        }
        return setting;
      });
      return {
        ...state,
        settings: newSettings,
      };
    case TOGGLE_SETTINGS_VISIBILITY:
      return {
        ...state,
        isVisible: !isVisible,
      };
    default:
      return state;
  }
};

export default settingsReducer;
