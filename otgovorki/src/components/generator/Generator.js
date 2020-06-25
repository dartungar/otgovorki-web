import React, { Fragment, useContext } from "react";
import TextBox from "./TextBox";
import MainButtonRow from "./MainButtonRow";
import SettingsBox from "./SettingsBox";
import GeneratorContext from "../../context/generator/generatorContext";

const Generator = () => {
  const generatorContext = useContext(GeneratorContext);
  const { isSettingsBoxVisible } = generatorContext;

  return (
    <Fragment>
      <div className="main-container d-flex align-items-center flex-column justify-content-center">
        <TextBox />
        <MainButtonRow />
      </div>
      {isSettingsBoxVisible && <SettingsBox />}
    </Fragment>
  );
};

export default Generator;
