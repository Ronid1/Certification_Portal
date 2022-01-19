import React, {Component} from "react";
import AllCertifications from "../components/myCertifications/allCertifications";
import Navigation from '../components/Navigation';
import UserInfo from "../components/myCertifications/UserInfo";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

function Certifications() {

    return (
      <div>
        <Navigation />
        <Container>
          <Row>
          <Col md={4}>
            <UserInfo />
          </Col>
          <Col>
            <h1>My Certifications</h1>
            <AllCertifications />
          </Col>
          </Row>
        </Container>
      </div>
    )
}

export default Certifications;