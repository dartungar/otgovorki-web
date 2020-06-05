import React, {useState, useEffect} from "react";
import TextBox from "./TextBox";
import MainButtonRow from "./MainButtonRow";
import SettingsBox from "./SettingsBox";
import {settingsList, settingTypesList} from "./Settings";

function Generator() {
    // state
    const [otgovorka, setOtgovorka] = useState({
        id: '0',
        content: "Еду я по выбоинам, по выбоинам да не выеду я. Шла Саша по шоссе и сосала сушки. Ехал Сталин через Сталин - видит Сталин: Сталин Сталин. ⬇"
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFailed, setIsLoadingFailed] = useState(false);
    const [defaultSettings] = useState(settingsList);
    const [settingTypes] = useState(settingTypesList);
    const [settings, setSettings] = useState();
    const [isSettingsShown, setIsSettingsShown] = useState(false);
    const [isCopyMessageVisible] = useState(false);

    // if settings are not set, use default settings
    if (!settings) {
        console.log('setting default settings...')
        setSettings(defaultSettings);
    }

    useEffect(() => {
        loadGeneratedOtgovorka();
    }, [])

    useEffect(() => {
        if (isLoadingFailed) {
            setOtgovorka({id: 0, content: 'Ошибка! Нажмите "Обновить" ещё раз.'})
        }
    }, [isLoadingFailed])


    // find active settings
    function composeParameters() {
    const params = {
        plausibility: settings.filter(
        (item) => {return item.isActive && item.settingTypeID ===1 }
        )[0]["value"],
        theme: settings.filter((item) => {return item.isActive && item.settingTypeID === 2 })[0]["value"],
        sex: settings.filter((item) => {return item.isActive && item.settingTypeID === 3 })[0]["value"],
        tense: settings.filter((item) => {return item.isActive && item.settingTypeID === 4 })[0]["value"],
    };
    console.log(params);
    return params;
    }

    // if sex is male, 'loader' emoji will be male, same for female
    // used in TextBox component
    function isSexMale() {
        if (!settings) {
            return true;
        } else {
            const sex = settings.filter((item) => {return item.isActive && item.settingTypeID === 3 })[0]["value"];
            if (sex === 'masc') {
            return true;
            } else {return false} 
        }
    }


    function loadGeneratedOtgovorka() {
        var params = composeParameters();
        setIsLoading(true);
        fetch(
            // pass active settings as request url params
            `/api/generate/get?plausibility=${params.plausibility}&theme=${params.theme}&sex=${params.sex}&tense=${params.tense}`,
            {
                method: "GET",
                mode: "cors"
            })
            .then((res) => res.json())
            .then((data) => {
                // store new otgovorka in state variable
                setOtgovorka({
                    id: data.id,
                    content: data.content
                });
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoadingFailed(true);
                setIsLoading(false);
            });
    }
    

    // toggle settings visibility on & off
    function handleClickSettings() {
        setIsSettingsShown(prevVal => {
            return !prevVal;
        })
    }

    // catch changed settings from levels below
    // settings are changed in SettingsItem and passed up
    function handleChangeSettings(new_settings) {
        setSettings(new_settings);
    }

    return <div className="main-container d-flex align-items-center flex-column justify-content-center">
                <TextBox isLoading={isLoading} isLoadingFailed={isLoadingFailed} otgovorka={otgovorka} isCopyMessageVisible={isCopyMessageVisible} isSexMale={isSexMale()}/>
                <MainButtonRow isLoading={isLoading} handleClickSubmit={loadGeneratedOtgovorka} handleClickSettings={handleClickSettings}/>
                <SettingsBox settings={settings} settingTypes={settingTypes} isHidden={!isSettingsShown} onChangeSettings={handleChangeSettings}/>
           </div>
}

export default Generator;
