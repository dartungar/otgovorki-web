import React, {useState, useEffect} from "react";

function SettingsItem(props) {

    const [isActive, setIsActive] = useState(false);
    const [newSettings, setNewSettings] = useState();
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        setIsActive(props.isActive);
    }, [props.isActive])


    let adequacyLevel = props.settings.filter(setting => {return setting.settingTypeID === 1 && setting.isActive === true})[0]["id"];

    useEffect(() => {
        if (adequacyLevel !== 1) {
            if (props.settingTypeID !== 1) {
                setIsDisabled(true);
            } 
        } else {
            setIsDisabled(false);
        }
    }, [adequacyLevel, props.settings, props.settingTypeID])


    function handleChange(event) {
        console.log('click event', props.settingID);
        if (!isActive) {
            const {id, name} = event.target;
            setIsActive(true);
            findAndChangeOption(Number(id), Number(name));
            props.onCheck(newSettings);
        } 
    }

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
        /> <label className="form-check-label">{props.title}</label>
        </div>
}

export default SettingsItem;