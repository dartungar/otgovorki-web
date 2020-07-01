import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <p className="text-center text-nowrap">
        ©{" "}
        <a className="custom-link" href="https://github.com/dartungar">
          dartungar
        </a>
        , 2020
        {" • "}
        <Link to="/about" className="custom-link">
          О проекте
        </Link>
        {" • "}
        <Link to="/feedback" className="custom-link">
          Обратная связь
        </Link>
      </p>
    </div>
  );
};

export default Footer;
