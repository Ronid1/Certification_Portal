import React, {useState, useEffect} from "react";
import { CertificationsActions } from "../../services/api/certificationsActions";
import Container from 'react-bootstrap/Container'
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function UserLevel({data}) {
    const cert_id = data.id
    let [levels, setLevels] = useState([]);
    let [firstRender, setfirstRender] = useState(true);
    let [currentLevel, setCurrentLevel] = useState(data.level);
    let levelDropDown = [];

    if (firstRender){
        setfirstRender(false);
        getLevels();
    }
    useEffect(() => {
            addLevelstoList();
    }, [levels, firstRender, currentLevel])

    async function getLevels(){
        let scale = new CertificationsActions();
        await scale.getScaleLevel(cert_id).then(res => {
            setLevels(res);
        })
    }

    function addLevelstoList(){
        let size = levels.length;
        for (let i=0; i<size; i++){
            levelDropDown.push(
                <Dropdown.Item 
                    key={i} 
                    onClick={()=>changeLevel(levels[i].level)}>
                        {levels[i].level}
                </Dropdown.Item>)     
        }
    }

    function changeLevel(name){
        //TO DO - change level in database

        setCurrentLevel(name);
    }

    return(
        <Container id="train">
            <Row>
                <Col>{data.user_name}</Col>
                <Col>
                    <DropdownButton id="dropdown-basic-button" title={currentLevel}>
                        {levelDropDown}
                    </DropdownButton>               
                </Col>
            </Row>
        </Container>
    )
    
}

export default UserLevel;