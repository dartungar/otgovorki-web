import React, { useState, useEffect, useContext } from "react";
import SettingsContext from "../../context/settings/settingsContext";

function SettingsItem(props) {
  const settingsContext = useContext(SettingsContext);

  // state
  // isActive: is current item active, affects display
  const [isActive, setIsActive] = useState(false);
  // isDisabled: is current item disabled, affects display
  const [isDisabled, setIsDisabled] = useState(false);

  // set isActive to what we receive from SettingsColumn
  useEffect(() => {
    setIsActive(props.isActive);
  }, [props.isActive]);

  // determine level of 'adequacy'
  // on some levels some options are disabled
  let adequacyLevel = settingsContext.settings.filter((setting) => {
    return setting.settingTypeID === 1 && setting.isActive === true;
  })[0]["id"];

  // determine if current level of adequacy affects this settings item's display
  useEffect(() => {
    if (adequacyLevel !== 1) {
      if (props.settingTypeID !== 1) {
        setIsDisabled(true);
      }
    } else {
      setIsDisabled(false);
    }
  }, [adequacyLevel, props.settings, props.settingTypeID]);

  return (
    <div>
      <input
        className="form-check-input checkmark"
        type="radio"
        checked={isActive}
        disabled={isDisabled}
        label={props.title}
        id={props.settingID}
        name={props.settingTypeID}
        onChange={() =>
          settingsContext.setSettings({
            id: props.settingID,
            settingTypeID: props.settingTypeID,
            isActive: isActive,
          })
        }
      />
      <label htmlFor={props.settingID}>{props.title}</label>
    </div>
  );
}

export default SettingsItem;
