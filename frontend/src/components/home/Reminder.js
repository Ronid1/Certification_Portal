import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Toast from 'react-bootstrap/Toast';
import Alert from 'react-bootstrap/Alert';


//https://react-bootstrap.github.io/components/toasts/
//https://react-bootstrap.github.io/components/alerts/#dismissing
function Reminder({data}) {

    const CERT = true;
    const [show, setShow] = useState(true);

    if (show) {
        if (data.type == CERT){
            return (
                <Alert variant="danger" style={{ height: '4rem' }} onClose={() => setShow(false)} dismissible>
                <p>{data.name} certification is expiring in {data.days} days</p>
                </Alert>
            );
        }

        else{
            return (
                <Alert variant="danger" style={{ height: '4rem' }} onClose={() => setShow(false)} dismissible>
                <p>{data.name} training not completed</p>
                </Alert>
            );
        }

    }

    return null;

}

export default Reminder;