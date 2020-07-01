import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Logo from "./layout/Logo";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Generator from "./generator/Generator";
import Ranking from "./ranking/Ranking";
import Submit from "./submit/Submit";
import About from "./about/About";
import Feedback from "./about/Feedback";
import NotFound from "./layout/NotFound";
import GeneratorState from "../context/generator/GeneratorState";
import RankingState from "../context/ranking/RankingState";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "./ranking/Ranking.css";
import "./submit/Submit.css";

function App() {
  // basic structure of the app
  // header, main container, footer
  return (
    <GeneratorState>
      <RankingState>
        <Router>
          <div className="app-container d-flex flex-column">
            <Logo />
            <Navbar />
            <Switch>
              <Route exact path="/" component={Generator} />
              <Route exact path="/top" component={Ranking} />
              <Route exact path="/submit" component={Submit} />
              <Route exact path="/about" component={About} />
              <Route exact path="/feedback" component={Feedback} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </RankingState>
    </GeneratorState>
  );
}

export default App;
