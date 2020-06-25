import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import GeneratorContext from "../../context/generator/generatorContext";

const SettingsItem = ({ setting, settingType, isActive }) => {
  const generatorContext = useContext(GeneratorContext);
  const { settings, setSettings } = generatorContext;

  // state
  // isDisabled: is current item disabled, affects display
  const [isDisabled, setIsDisabled] = useState(false);

  // determine if current level of adequacy affects this settings item's display
  useEffect(() => {
    if (settings.plausibility.activeOption.value !== "adequate") {
      if (!["adequate", "funny", "insane"].includes(setting.value)) {
        setIsDisabled(true);
      }
    } else {
      setIsDisabled(false);
    }
  });

  return (
    <div>
      <input
        className="form-check-input checkmark"
        type="radio"
        name={setting.value}
        id={setting.value}
        checked={isActive}
        disabled={isDisabled}
        onChange={() =>
          setSettings({
            setting: setting,
            settingType: settingType,
            isActive: isActive,
          })
        }
      />
      <label htmlFor={setting.value}>{setting.title}</label>
    </div>
  );
};

SettingsItem.propTypes = {
  setting: PropTypes.object.isRequired,
  settingType: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default SettingsItem;
