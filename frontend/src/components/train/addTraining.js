import React, {useState, useEffect} from "react";
import { TrainingModulesActions } from "../../services/api/trainingModulesActions"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function AddTraining ({show, setShow, certificationId}) {
    let [name, setname] = useState("");
    let [file, setfile] = useState("");
    let [showError, setShowError] = useState(false)

    async function addNewTraining(){
        if (name == "" || file == ""){
            setShowError(true);
            return;
        }

        let trainingModule = new TrainingModulesActions();
        //add to Db
        await trainingModule.createData({certification_id: certificationId, name:name, link:file}).then(res => {
            return res
        })

        setShow(false);
    }

    return(
        <Modal show={show}>
            <Modal.Header>
            <Modal.Title>Add a new Training</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Alert variant="danger" show={showError} onClose={() => setShowError(false)} dismissible>
            <p> All fields must be filled </p>
            </Alert>

            <Form.Group controlId="formLink" className="mb-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                type="text" 
                value = {name}
                onChange= { (event) => setname(event.target.value) }
                />
            </Form.Group>
            <Form.Group controlId="formLink" className="mb-3">
                <Form.Label>Link to file:</Form.Label>
                <Form.Control 
                type="text" 
                value = {file}
                onChange= { (event) => setfile(event.target.value) }
                />
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
                Cancel
            </Button>
            <Button variant="primary" onClick={() => addNewTraining()}>
                Save
            </Button>
            </Modal.Footer>
        </Modal>
    );


}

export default AddTraining;