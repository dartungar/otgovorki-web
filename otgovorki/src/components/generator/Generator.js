import React, { useState, useEffect, useContext } from "react";
import TextBox from "./TextBox";
import MainButtonRow from "./MainButtonRow";
import SettingsBox from "./SettingsBox";
import SettingsContext from "../../context/settings/settingsContext";

function Generator() {
  const settingsContext = useContext(SettingsContext);
  const { settings, isVisible } = settingsContext;

  // state
  const [otgovorka, setOtgovorka] = useState({
    id: "0",
    content:
      "Еду я по выбоинам, по выбоинам да не выеду я. Шла Саша по шоссе и сосала сушки. Ехал Сталин через Сталин - видит Сталин: Сталин Сталин. ⬇",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);
  const [isCopyMessageVisible] = useState(false);

  useEffect(() => {
    loadGeneratedOtgovorka();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isLoadingFailed) {
      setOtgovorka({ id: 0, content: 'Ошибка! Нажмите "Обновить" ещё раз.' });
    }
  }, [isLoadingFailed]);

  // find active settings & compose an object for request to the API
  function composeParameters() {
    const params = {
      plausibility: settings.filter((item) => {
        return item.isActive && item.settingTypeID === 1;
      })[0]["value"],
      theme: settings.filter((item) => {
        return item.isActive && item.settingTypeID === 2;
      })[0]["value"],
      sex: settings.filter((item) => {
        return item.isActive && item.settingTypeID === 3;
      })[0]["value"],
      tense: settings.filter((item) => {
        return item.isActive && item.settingTypeID === 4;
      })[0]["value"],
    };
    console.log(params);
    return params;
  }

  // if sex is male, 'loader' emoji will be male, same for female
  // used in TextBox component
  function isSexMale() {
    if (!settings) {
      // sorry ladies
      return true;
    } else {
      const sex = settings.filter((item) => {
        return item.isActive && item.settingTypeID === 3;
      })[0]["value"];
      if (sex === "masc") {
        return true;
      } else {
        return false;
      }
    }
  }

  // fetch otgovorka from API
  function loadGeneratedOtgovorka() {
    var params = composeParameters();
    setIsLoading(true);
    fetch(
      // pass active settings as request url params
      `/api/generate/get?plausibility=${params.plausibility}&theme=${params.theme}&sex=${params.sex}&tense=${params.tense}`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // store new otgovorka in state variable
        setOtgovorka({
          id: data.id,
          content: data.content,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingFailed(true);
        setIsLoading(false);
      });
  }

  return (
    <div className="main-container d-flex align-items-center flex-column justify-content-center">
      <TextBox
        isLoading={isLoading}
        isLoadingFailed={isLoadingFailed}
        otgovorka={otgovorka}
        isCopyMessageVisible={isCopyMessageVisible}
        isSexMale={isSexMale()}
      />
      <MainButtonRow
        isLoading={isLoading}
        handleClickSubmit={loadGeneratedOtgovorka}
      />
      {isVisible && <SettingsBox />}
    </div>
  );
}

export default Generator;
