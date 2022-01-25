import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfilesActions } from "../../services/api/profilesActions";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChangePicPopUp from "./ChangePicPopUp";

function UserInfo() {
    const userInfo = useSelector((state) => state.user.value);
    const defaultImg = '../../static/images/profile_pic.png';
    const nullPath = 'http://127.0.0.1:8000/media/null';
    const [modalShow, setModalShow] = useState(false);


    function getImage(){
        if (userInfo.image == nullPath)
            return defaultImg
        
        return userInfo.image;
    }

    function changePic(){
        setModalShow(true);
    }

    return(
        <Container>
            <Row>
                <p><b>Name:</b> {userInfo.name}</p>
            </Row>
            <Row>
                <p><b>Role:</b> {userInfo.role}</p>
            </Row>
            <Row>
                <Col>
                <Image 
                    src={getImage()}  
                    width="100"
                    height="100" 
                    rounded />
                </Col>
            </Row>
            <Row>
                <Col>
                <Button variant="light"  size="sm" onClick={changePic}>
                    edit
                </Button>
                <ChangePicPopUp 
                    show={modalShow}
                    onHide={()=> setModalShow(false)} 
                />
                </Col>
            </Row>
        </Container>
    )

}

export default UserInfo;