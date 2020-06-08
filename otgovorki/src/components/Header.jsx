import React from "react";
import Nav from "react-bootstrap/Nav";

function Header(props){
    return  <Nav className="justify-content-center" activeKey={props.currentPage}>
                <Nav.Link className="custom-link custom-navbar-link" eventKey="generator" name="generator" onClick={props.onClickNavItem}>
                    Генератор
                </Nav.Link>
                <Nav.Link className="custom-link custom-navbar-link"  eventKey="top" name="top" onClick={props.onClickNavItem}>
                    Топ
                </Nav.Link>
                <Nav.Link className="custom-link custom-navbar-link"  eventKey="submit" name="submit" onClick={props.onClickNavItem}>
                    Предложить
                </Nav.Link>
            </Nav>

}

export default Header;