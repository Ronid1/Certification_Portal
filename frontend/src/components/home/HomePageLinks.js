import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LinkBox from "./LinkBox";
import Container from "react-bootstrap/esm/Container";

function HomePageLinks(){

  return (
    <Container>
    <Row>
        <Col>
            <LinkBox data = {{text: "My Certifications", url: "/certifications"}} />
        </Col>
        <Col>
            <LinkBox data = {{text: "Get Certified", url: "/get-certified"}} />
        </Col>
        <Col>
            <LinkBox data = {{text: "Train", url: "/train"}} />
        </Col>
        <Col>
            <LinkBox data = {{text: "My Team", url: "/team"}} />
        </Col>
    </Row>
    </Container>
  );
}

export default HomePageLinks;