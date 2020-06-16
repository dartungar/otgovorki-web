import React, { useState, useEffect, useContext } from "react";
import TextBox from "./TextBox";
import MainButtonRow from "./MainButtonRow";
import SettingsBox from "./SettingsBox";
import GeneratorContext from "../../context/generator/generatorContext";

function Generator() {
  const generatorContext = useContext(GeneratorContext);
  const { isSettingsBoxVisible } = generatorContext;

  return (
    <div className="main-container d-flex align-items-center flex-column justify-content-center">
      <TextBox />
      <MainButtonRow />
      {isSettingsBoxVisible && <SettingsBox />}
    </div>
  );
}

export default Generator;
