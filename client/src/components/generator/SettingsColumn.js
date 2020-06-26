import React from "react";
import PropTypes from "prop-types";
import SettingsItem from "./SettingsItem";

const SettingsColumn = ({ setting }) => {
  const { settingType, title, options, activeOption } = setting;
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
};

SettingsColumn.propTypes = {
  setting: PropTypes.object.isRequired,
};

export default SettingsColumn;
