import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import SettingsItem from "./SettingsItem"

function SettingsColumn(props) {
    const [newSettings, setNewSettings] = useState();

    function updateSettings(newSettings) {
        setNewSettings(newSettings);
        props.onChangeSettings(newSettings);
    }

    return <div> 
                <h5>{props.title}</h5>
                <div className="form-check settings-column">
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