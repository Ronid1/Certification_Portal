import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Ratio from 'react-bootstrap/Ratio';
import { UserTrainingsActions } from "../../services/api/userTrainingsActions";


function TrainingBar({data}) {
    const [trainingVisable, setTrainingVisable] = useState(false)
    let [done, setDone] = useState(data.status);
    
    function markAsDone(){
        let thisTraining = new UserTrainingsActions();
        let userTraining = data.user_training_id;
        //update data in Db
        thisTraining.updateIdWithData(userTraining, {completed: true})

        //change status to done
        setDone(true);

        setTrainingVisable(false)
    }

    return(
        <>
            <Button id="training-bar" onClick={() => setTrainingVisable(true)}>
                <Row>
                    <Col>{data.name}</Col>
                    <Col>{done ? "Completed" : "Pending"}</Col>
                </Row>
            </Button>

            <Modal show={trainingVisable} fullscreen={true} onHide={() => setTrainingVisable(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{data.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Ratio aspectRatio="16x9">
                <embed type="text/html" src={data.link} />
                </Ratio>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={markAsDone}>Complete Training</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TrainingBar;