import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Header from "./Header";
import Footer from "./Footer";
import Generator from "./generator/Generator";
import Ranking from "./top/Ranking";
import Submit from "./submit/Submit";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import "./top/Ranking.css";
import "./submit/Submit.css";

function App() {
  const [currentPage, setCurrentPage] = useState(
    () => JSON.parse(localStorage.getItem('currentPage')) || 'generator'
  );

  useEffect(() => {
    localStorage.setItem('currentPage', JSON.stringify(currentPage));
  }, [currentPage])

  function changeCurrentPage(event) {
    console.log(event.target.name);
    setCurrentPage(event.target.name);
  }

  // basic structure of the app
  // header, main container, footer
  return (
    <div className="app-container d-flex flex-column">
    <Logo/>
      <Header onClickNavItem={changeCurrentPage} currentPage={currentPage}/>
      {currentPage === "generator" && <Generator/>}
      {currentPage === "top" && <Ranking/>}
      {currentPage === "submit" && <Submit/>}
      
      <div>
        <Footer/>
      </div>  
    </div>
  );
}

export default App;
