import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal'


function TrainingBar({data}) {
    const [trainingVisable, setTrainingVisable] = useState(false)

    function markAsDone(){
        //mark training done in backend
        //change statue to done in redux
        //change from pending to done
    }

    return(
        <>
            <Button id="training-bar" onClick={() => setTrainingVisable(true)}>
                <Row>
                    <Col>{data.name}</Col>
                    <Col>{data.status ? "Completed" : "Pending"}</Col>
                </Row>
            </Button>

            <Modal show={trainingVisable} fullscreen={true} onHide={() => setTrainingVisable(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{data.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{data.file}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={markAsDone}>Complete Training</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TrainingBar;