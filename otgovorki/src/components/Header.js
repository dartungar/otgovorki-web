import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Header(){
    return <Navbar className="header centered-navbar justify-content-center">
                <Navbar.Brand><h3>otgovorki</h3></Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse className="m-auto" id="basic-navbar-nav"> */}
                    {/* <Nav>
                        <Nav.Link>
                            Генератор
                        </Nav.Link>
                        <Nav.Link>
                            Топ
                        </Nav.Link>
                        <Nav.Link>
                            Об авторе
                        </Nav.Link>
                    </Nav> */}
                {/* </Navbar.Collapse> */}

            </Navbar>

}

export default Header;