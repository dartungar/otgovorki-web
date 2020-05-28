import React, {useState} from "react";
import SettingsItem from "./SettingsItem"

function SettingsColumn(props) {
    // state
    // intermediate container for newSettings changed in SettingsItem.js
    const [newSettings, setNewSettings] = useState();

    // send changed settings up to App.js
    function updateSettings(newSettings) {
        setNewSettings(newSettings);
        props.onChangeSettings(newSettings);
    }

    return <div> 
                <h5>{props.title}</h5>
                <div className="settings-column">
                    {props.items.map((item, index) => {
                        return <SettingsItem 
                        key={index}
                        isActive={item.isActive}
                        settingID={item.id}
                        settingTypeID={item.settingTypeID}
                        title={item.title} 
                        value={item.value}
                        settings={props.settings}
                        onCheck={updateSettings}
                        />
                    }

                    )}
                </div>

            </div>

}

export default SettingsColumn;