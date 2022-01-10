import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePic } from '../../services/redux/userSlice';
import { ProfilesActions } from "../../services/api/profilesActions";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ChangePicPopUp(props) {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.value.id);
    const [newImage, setNewImage] = useState("");
    let [file, setFile] = useState("");

    function fetchImg(event){
        setNewImage(event.target.value)
        setFile(event.target.files[0]);
    }

    //save new image to Db and change state in redux to display new pic on page
    async function saveImg() {
        let fd = new FormData();
        fd. append('image', file)

        //upload image
        let user = new ProfilesActions();
        user.updateIdWithData(id, fd)
        
        // upload path of new image to state
        await user.getId(id).then(res => {
            dispatch(changeProfilePic(res.image));
        })
        
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
                onChange= { (event) => fetchImg(event) }
                />
            </Form.Group>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancel</Button>
                <Button onClick={()=> saveImg()}>Save</Button>
            </Modal.Footer>
        </Modal.Body>
        </Modal>
    );
}

    export default ChangePicPopUp;