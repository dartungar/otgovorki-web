import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const Header = () => {
  return (
    <Nav className="justify-content-center">
      <NavLink
        exact={true}
        className="custom-link custom-navbar-link"
        activeClassName="custom-navbar-link-active"
        to="/"
      >
        Генератор
      </NavLink>
      <NavLink
        className="custom-link custom-navbar-link"
        activeClassName="custom-navbar-link-active"
        to="/top"
      >
        Топ
      </NavLink>
      <NavLink
        className="custom-link custom-navbar-link"
        activeClassName="custom-navbar-link-active"
        to="/submit"
      >
        Предложить
      </NavLink>
    </Nav>
  );
};

export default Header;
