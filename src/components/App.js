import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "../App.css";

function App() {
  const [word, setWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setIsLoading(true);
    console.log(isLoading);
    fetch("http://localhost:5000/api/random", {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setWord(data);
        setIsLoading(false);
      });
  }

  return (
    <div className="text-container container-fluid">
      <h2>При пожаре</h2>
      <p className="text-box">
        {isLoading ? (
          <Spinner animation="border" size="md" variant="info" />
        ) : (
          word
        )}
      </p>
      <Button
        className="refresh-btn"
        variant="info"
        disabled={isLoading}
        onClick={handleClick}
      >
        Refresh
      </Button>
    </div>
  );
}

export default App;
