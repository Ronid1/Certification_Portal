import React, {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container'
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { TrainingModulesActions } from "../../services/api/trainingModulesActions";

function EditTraining({data}) {

    const training_id = data.id
    let [showEdit, setShowEdit] = useState(false);
    let [showDelete, setShowDelete] = useState(false);
    let [newFile, setNewFile] = useState(data.file)

    function edit(){
        //change file in db
        let training = new TrainingModulesActions();
        training.updateIdWithData(training_id, {link: newFile});
        setShowEdit(false);
    }

    function deleteTraining(){
        //delete record from db
        let training = new TrainingModulesActions();
        training.DeleteId(training_id);
        
        setShowDelete(false);
    }

    return(
        <>
        <Container id="train">
            <Row>
                <Col>{data.name}</Col>
                <Col>
                <Button onClick={() => setShowEdit(true)}>Edit</Button>
                <Button onClick={() => setShowDelete(true)}>Delete</Button>
                </Col>
            </Row>
        </Container>
 
        <Modal show={showEdit}>
            <Modal.Header>
            <Modal.Title>Edit Training</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group controlId="formLink" className="mb-3">
                <Form.Label>Add a link to file to replace current training</Form.Label>
                <Form.Control 
                type="text" 
                value = {newFile}
                onChange= { (event) => setNewFile(event.target.value) }
                />
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEdit(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={edit}>
                Save
            </Button>
            </Modal.Footer>
        </Modal>

        
        <Modal show={showDelete}>
            <Modal.Header>
            <Modal.Title>Delete Training</Modal.Title>
            </Modal.Header>
            <Modal.Body>are you sure you want to delete {data.name}?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDelete(false)}>
                Cancel
            </Button>
            <Button variant="primary" onClick={deleteTraining}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>

        </>
    )
    
}

export default EditTraining;