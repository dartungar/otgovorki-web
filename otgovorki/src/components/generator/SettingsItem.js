import React, { useState, useEffect, useContext } from "react";
import GeneratorContext from "../../context/generator/generatorContext";

function SettingsItem(props) {
  const generatorContext = useContext(GeneratorContext);
  const { settings, setSettings } = generatorContext;

  // state
  // isActive: is current item active, affects display
  const [isActive, setIsActive] = useState(false);
  // isDisabled: is current item disabled, affects display
  const [isDisabled, setIsDisabled] = useState(false);

  // set isActive to what we receive from SettingsColumn
  useEffect(() => {
    setIsActive(props.isActive);
  }, [props.isActive]);

  // determine if current level of adequacy affects this settings item's display
  useEffect(() => {
    if (settings.plausibility.activeOption.value !== "adequate") {
      if (!["adequate", "funny", "insane"].includes(props.setting.value)) {
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
        name={props.setting.value}
        id={props.setting.value}
        checked={isActive}
        disabled={isDisabled}
        onChange={() =>
          setSettings({
            setting: props.setting,
            settingType: props.settingType,
            isActive: isActive,
          })
        }
      />
      <label htmlFor={props.setting.value}>{props.setting.title}</label>
    </div>
  );
}

export default SettingsItem;
