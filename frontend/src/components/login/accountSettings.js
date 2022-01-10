import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../services/api/userActions"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

function AccountSetting(props) {
    const id = useSelector((state) => state.user.value.id);
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [wrongPassword, setWrongPassword] = useState(false);

    //if valid, save new password to db
    async function save() {
        const user = new UserActions();
        //try changing password in Db
        let success = await user.changePassword(id, oldPassword, newPassword).then(res => {
            return res
        })

        setNewPassword("");
        setOldPassword("");

        //if old password dosen't match to users current password - show error
        if(!success){
            setWrongPassword(true)
            return;
        }

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

        <Alert variant="danger" show={wrongPassword} onClose={() => setWrongPassword(false)} dismissible>
        <Alert.Heading></Alert.Heading>
        <p>
        Old password dosen't match to current password. Please try again.
        </p>
      </Alert>

        <Form.Group className="mb-3" id="old-password" controlId="formBasicPassword">
            <Form.Label>Old Password</Form.Label>
        <Form.Control 
            type="password" 
            placeholder="Password" 
            value = {oldPassword}
            onChange= { (event) => setOldPassword(event.target.value) } />
        </Form.Group>

        <Form.Group className="mb-3"  id="new-password" controlId="formBasicPassword">
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