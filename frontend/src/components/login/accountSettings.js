import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../services/api/userActions"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AccountSetting(props) {
    const id = useSelector((state) => state.user.value.id);
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    //choose pic, submit -> post to database
    function save() {
        console.log(id)
        const user = new UserActions();
        let success = user.changePassword(id, oldPassword, newPassword);
        
        setNewPassword("");
        setOldPassword("");
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
            Change Password
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Old Password</Form.Label>
        <Form.Control 
            type="password" 
            placeholder="Password" 
            value = {oldPassword}
            onChange= { (event) => setOldPassword(event.target.value) } />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
        <Form.Control 
            type="password" 
            placeholder="Password" 
            value = {newPassword}
            onChange= { (event) => setNewPassword(event.target.value) } />
        </Form.Group>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancel</Button>
                <Button onClick={save}>Save</Button>
            </Modal.Footer>
        </Modal.Body>
        </Modal>
    );
}

    export default AccountSetting;