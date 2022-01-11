import React from "react";
import Card from 'react-bootstrap/Card'

function CertificationBox({data}) {
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text> level: {data.level} </Card.Text>
                <Card.Text> certification date: {data.date} </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CertificationBox;