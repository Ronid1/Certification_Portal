import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { ScaleActions } from '../../services/api/scalesActions';
import { CertificationsActions } from '../../services/api/certificationsActions';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { ProfilesActions } from '../../services/api/profilesActions';
import { InstructorsActions } from '../../services/api/instructorsActions';

function EditCerttification({show, setShow, newCert, trainers, data}){

    let [name, setName] = useState("");
    let [practical, setPractical] = useState(true);
    let [scale, setScale] = useState("");
    let [duration, setDuration] = useState("");
    let [certTrainers, setCertTrainers] = useState([]);
    let [showError, setShowError] = useState(false);
    let [scaleOptions, setScaleOptions] = useState();
    let [firstScale, setFirstScale] = useState({name: "", data:""});
    let [allUsers, setAllUsers] = useState([]);
    let [deleteButton, setDeleteButton] = useState([]);

    useEffect(() => {
        getCertData();
        getDelete();
        getAllUsers();
    }, [data, newCert])

    
    useEffect(() => {
        getScaleOptions();
    }, [show, firstScale])

    function getDelete(){
        if (!newCert){
        setDeleteButton(
            <Button id="btn-primary" onClick={() => deleteCert()}> 
                Delete this Certification
            </Button>)

        }
    }

    //get all users in Db to display as potential trainers
    async function getAllUsers(){
        let users = new ProfilesActions();
        let temp = [];
        await users.getAll().then(res => {
            for (let item of res){
                temp.push({key:item.user_id, label:item.user_name})
            }
        })
        setAllUsers(temp);
    }

    async function getScaleOptions(){
        let scaleList = new ScaleActions();
        let tempList = [];

        if (firstScale.name != ""){
            tempList.push(firstScale.data)
        }
        await scaleList.getAll().then(res => {
            for (let item of res){
                //defualt scale is the first one in the list
                if (scale == "")
                    setScale(item.scale_name);

                if (item.scale_name != firstScale.name)
                    tempList.push(<option key={item.id} value={item.scale_name}>{item.scale_name}</option>); 
            }
        })

        setScaleOptions(tempList);
    }

    async function getCertData(){
        if (newCert)
            return

        setName(data.certification_name);
        setPractical(data.practical);
        setCertTrainers(trainers)

        let certId = data.certification_id;
        let certs = new CertificationsActions();

        await certs.getId(certId).then(res => {
            setScale(res.level_scale);
            setDuration(res.days_valid);
        })

        let scaleList = new ScaleActions();

        await scaleList.getScaleByName(scale).then(res =>{
            setFirstScale({name: scale, data: <option key={res.id} value={scale}>{scale}</option>});
        })

    }

    async function save(){
        if (name == "" || scale.length == 0)
            setShowError(true);

        let cert = new CertificationsActions();
        let instructor = new InstructorsActions();

        let info = {name:name, practical:practical, level_scale:scale, days_valid:duration};

        if (newCert){
            let certId = await cert.createData(info).then(res => {
                console.log(res);
                return res.data.id;
            })

            //create trainers for this certification
            for (let user of certTrainers){
                instructor.createData({user_id: parseInt(user), certification_id:certId})
            }
        }

        else{
            //edit certification data
            cert.updateIdWithData(data.certification_id, info);

            //compare certifications current instructors to ones selected and add/remove as needed
            await instructor.findByCertId(data.certification_id).then(res => {

            //delete instructor
            for (let currentInstractor of res){
                let found = false;

                for (let selecetedInstructor of certTrainers){
                    //current instrucot was also selected
                    if (currentInstractor.user_id == parseInt(selecetedInstructor)){
                        found = true;
                        break;
                    }
                }
                //current instructor was no selected -> delete
                if (!found)
                    instructor.DeleteId(currentInstractor.id)

            }

            //add new selected instroctors
            for (let selecetedInstructor of certTrainers){

                let found = false;

                for (let currentInstractor of res){
                    //selected instructor already exists
                    if (currentInstractor.user_id == parseInt(selecetedInstructor)){
                        found = true;
                        break;
                    }
                }
                //create new instructor
                if (!found)
                    instructor.createData({user_id: parseInt(selecetedInstructor), certification_id:data.certification_id})
            }
        })
        }

        zeroAndClose();
    }

    function deleteCert(){
        let cert = new CertificationsActions();
        cert.DeleteId(data.certification_id);
        zeroAndClose();

    }


    function zeroAndClose(){
        setName("");
        setPractical(true);
        setScale("");
        setDuration("");
        setCertTrainers([]);
        setShow(false);
    }


    return(
        <Modal show={show}>
        <Modal.Header>
        <Modal.Title>Cartification Configurations</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Alert variant="danger" show={showError} onClose={() => setShowError(false)} dismissible>
        <p> Name and scale must have a value </p>
        </Alert>
       
       {deleteButton}

        <Form.Group controlId="formLink" className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control 
            type="text"
            placeholder = "Name"
            value = {name}
            onChange= { (event) => setName(event.target.value) }
            />
        </Form.Group>

        
        <Form.Group controlId="formLink" className="mb-3">
            <Form.Label>scale</Form.Label>
            <Form.Select 
            type="text"
            placeholder = "Scale"
            value = {scale}
            onChange= { (event) => setScale(event.target.value) }
            >
                {scaleOptions}
            </Form.Select>
        </Form.Group>

        
        <Form.Group controlId="formLink" className="mb-3">
            <Form.Label>Days Valid:</Form.Label>
            <Form.Control 
            type="text"
            placeholder = "Days Valid"
            value = {duration}
            onChange= { (event) => setDuration(event.target.value) }
            />
        </Form.Group>


    <Form.Check 
            type="checkbox" 
            label="Practical" 
            defaultChecked = {data ? data.practical : true}
            value = {practical} 
            onChange= { (event) => setPractical(event.target.value) }
        />

    Trainers:
    <DropdownMultiselect 
        options={allUsers} 
        name="trainers" 
        selected={newCert ? [] : trainers}
        handleOnChange= {(selected) => setCertTrainers(selected)}
    />

        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => zeroAndClose()}>
            Cancel
        </Button>
        <Button id="btn-primary" onClick={() => save()}> 
            Save
        </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default EditCerttification;