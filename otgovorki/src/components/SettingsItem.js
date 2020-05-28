import React, {useState, useEffect} from "react";

function SettingsItem(props) {
    // state
    // isActive: is current item active, affects display
    const [isActive, setIsActive] = useState(false);
    // newSettings - container for changed settings to send them up to App.js
    const [newSettings, setNewSettings] = useState();
    // isDisabled: is current item disabled, affects display
    const [isDisabled, setIsDisabled] = useState(false);

    // set isActive to what we receive from SettingsColumn
    useEffect(() => {
        setIsActive(props.isActive);
    }, [props.isActive])

    // determine level of 'adequacy'
    // on some levels some options are disabled
    let adequacyLevel = props.settings.filter(setting => {return setting.settingTypeID === 1 && setting.isActive === true})[0]["id"];

    // determine if current level of adequacy affects this settings item's display
    useEffect(() => {
        if (adequacyLevel !== 1) {
            if (props.settingTypeID !== 1) {
                setIsDisabled(true);
            } 
        } else {
            setIsDisabled(false);
        }
    }, [adequacyLevel, props.settings, props.settingTypeID])

    // on checking radio button - change settings
    // and send them up to App.js
    function handleChange(event) {
        console.log('click event', props.settingID);
        if (!isActive) {
            const {id, name} = event.target;
            setIsActive(true);
            findAndChangeOption(Number(id), Number(name));
            props.onCheck(newSettings);
        } 
    }
    // find setting based on current item's id
    // and change it in settings
    function findAndChangeOption(settingID, settingTypeID) {
        setNewSettings(props.settings.map(setting => {
            if (setting.settingTypeID === settingTypeID) {
                if (setting.id === settingID) {
                    setting.isActive = true;
                } else {
                    setting.isActive = false;
                }
            }
            return setting;
        })) 
    }

        return <div>
            <input 
            className="form-check-input checkmark"
            type='radio' 
            checked={isActive}
            disabled={isDisabled}
            label={props.title} 
            id={props.settingID}
            name={props.settingTypeID}
            onChange={handleChange}
        /> <label for={props.settingID}>{props.title}</label>
        </div>
}

export default SettingsItem;