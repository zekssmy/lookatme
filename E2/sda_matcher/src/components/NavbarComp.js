import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Explore from "./Explore";
import Home from "./Home";
import Matcher from "./Matcher";

export default class NavbarComp extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar bg="dark" variant={"dark"} expand="lg">
                        <Container>
                            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to={"/home"} href="#home">Home</Nav.Link>
                                    <Nav.Link as={Link} to={"/explore"} href="#link">Explore</Nav.Link>
                                    <Nav.Link as={Link} to={"/matcher"} href="#link">Matcher</Nav.Link>
                                    {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown>*/}
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                    <Routes>
                        <Route path='/matcher' element={<Matcher/>} />
                        <Route path='/explore' element={<Explore/>} />
                        <Route path='/home' element={<Home/>} />
                    </Routes>
                </div>
            </Router>
        )
    }
}