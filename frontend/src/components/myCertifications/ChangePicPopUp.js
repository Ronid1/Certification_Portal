import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePic } from '../../services/redux/userSlice';
import { ProfilesActions } from "../../services/api/profilesActions";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ChangePicPopUp(props) {
    const dispatch = useDispatch();
    //const image = useSelector((state) => state.user.value.image);
    const id = useSelector((state) => state.user.value.id);
    const [newImage, setNewImage] = useState("");

    //choose pic, submit -> post to database, change state
    function saveImg() {
        dispatch(changeProfilePic(newImage));
        //user = new ProfilesActions();
        //user.updateIdWithData(id, newImage)
        props.onHide();
    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
        <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
            Change Profile Picture
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose a profile picture</Form.Label>
                <Form.Control 
                type="file" 
                value = {newImage}
                onChange= { (event) => setNewImage(event.target.value) }
                />
            </Form.Group>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancel</Button>
                <Button onClick={saveImg}>Save</Button>
            </Modal.Footer>
        </Modal.Body>
        </Modal>
    );
}

    export default ChangePicPopUp;