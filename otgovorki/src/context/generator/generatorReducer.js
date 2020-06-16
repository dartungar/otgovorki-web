import {
  SET_GENERATED_OTGOVORKA,
  SET_IS_LOADING,
  SET_SETTINGS,
  TOGGLE_SETTINGS_VISIBILITY,
  SET_IS_LOADING_FAILED,
  SET_COPY_MESSAGE_VISIBLE,
} from "../types";

const settingsReducer = (state, action) => {
  const { settings, isSettingsBoxVisible } = state;

  switch (action.type) {
    case SET_GENERATED_OTGOVORKA:
      return {
        ...state,
        generatedOtgovorka: {
          id: action.payload.id,
          text: action.payload.content,
        },
        isLoading: false,
        isLoadingFailed: false,
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case SET_IS_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoadingFailed: true,
        generatedOtgovorka: {
          ...state.generatedOtgovorka,
          text: "Не смог сгенерировать отговорку 😥 Попробуйте ещё раз.",
        },
      };

    case SET_COPY_MESSAGE_VISIBLE:
      return {
        ...state,
        isCopyMessageVisible: action.payload,
      };

    case SET_SETTINGS:
      const { setting, settingType } = action.payload;
      // enable target setting & disable all others in its category (because radio buttons)
      const newSettings = {
        ...settings,
        [settingType]: {
          ...settings[settingType],
          activeOption: setting,
        },
      };
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
