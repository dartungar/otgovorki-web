import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Logo from "./Logo";
import Header from "./Header";
import Footer from "./Footer";
import Generator from "./generator/Generator";
import Ranking from "./ranking/Ranking";
import Submit from "./submit/Submit";
import NotFound from "./NotFound";
import GeneratorState from "../context/generator/GeneratorState";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "./ranking/Ranking.css";
import "./submit/Submit.css";

function App() {
  // basic structure of the app
  // header, main container, footer
  return (
    <GeneratorState>
      <Router>
        <div className="app-container d-flex flex-column">
          <Logo />
          <Header />
          <Switch>
            <Route exact path="/" component={Generator} />
            <Route exact path="/top" component={Ranking} />
            <Route exact path="/submit" component={Submit} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </GeneratorState>
  );
}

export default App;
