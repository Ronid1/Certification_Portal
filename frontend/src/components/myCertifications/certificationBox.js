import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { UserCertificationsActions } from "../../services/api/userCertificationsActions";

function CertificationBox({data}) {

    let [renew, setRenew] = useState([]);
    const userId = useSelector((state) => state.user.value.id);

    useEffect(() => {
        getRenew();
    }, []);
    
    function getRenew(){
        if (data.expires <= 30)
            setRenew(
                <Button variant="light"  size="sm" onClick={() => renewCert()}>
                    Renew
                </Button>
            )
    }

    function renewCert(){
        let userCert = new UserCertificationsActions();
        console.log(userId)
        console.log(data.certId)
        userCert.renewUser(userId, data.certId)
    }

    return(
        <Card id="cert-box" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text> level: {data.level} </Card.Text>
                <Card.Text> certification date: {data.date} </Card.Text>
                {renew}
            </Card.Body>
        </Card>
    )
}

export default CertificationBox;