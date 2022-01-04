import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from '../services/redux/userSlice';
import AccountSetting from './login/accountSettings';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {

  const dispatch = useDispatch();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <Navbar className="navbar-custom" variant="dark" fixed="top" expand="lg">
      <Container>

        <Navbar.Brand as={Link} to ="/">
          <img
            src="../../static/images/Logo.png"
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="zipline logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to ="/certifications">My Certifications</Nav.Link>
            <Nav.Link as={Link} to ="/get-certified">Get certified</Nav.Link>
            <Nav.Link as={Link} to ="/train">Train</Nav.Link>
            <Nav.Link as={Link} to ="/team">My Team</Nav.Link>
            
            <Nav className="justify-content-end">
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => setShowSettings(true) }>
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => dispatch(logout()) }>
                    Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

          </Nav>
        </Navbar.Collapse>
      </Container>
      <AccountSetting show={showSettings} onHide={()=> setShowSettings(false)} />
    </Navbar>

  );
}

export default Navigation;