import React from "react";
import SettingsItem from "./SettingsItem";

function SettingsColumn(props) {
  const { settingType, title, options, activeOption } = props.setting;
  return (
    <div>
      <h5>{title}</h5>
      <div className="settings-column">
        {options.map((item, index) => {
          return (
            <SettingsItem
              key={index}
              setting={item}
              settingType={settingType}
              isActive={item.value === activeOption.value}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SettingsColumn;
