import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

function LinkBox({data}) {
    return(
        <Card id="link-box" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Text>
                    <Link to={data.url} id="link">
                        {data.text}
                    </Link>
                </Card.Text>
            </Card.Body>
        </Card>
    )

}

export default LinkBox;