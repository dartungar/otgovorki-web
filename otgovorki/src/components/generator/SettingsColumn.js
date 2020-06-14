import React, { useContext } from "react";
import SettingsItem from "./SettingsItem";
import SettingsContext from "../../context/settings/settingsContext";

function SettingsColumn(props) {
  const settingsContext = useContext(SettingsContext);

  return (
    <div>
      <h5>{props.title}</h5>
      <div className="settings-column">
        {props.items.map((item, index) => {
          return (
            <SettingsItem
              key={index}
              isActive={item.isActive}
              settingID={item.id}
              settingTypeID={item.settingTypeID}
              title={item.title}
              value={item.value}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SettingsColumn;
