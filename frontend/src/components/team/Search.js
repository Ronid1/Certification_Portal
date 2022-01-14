import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";

// https://www.npmjs.com/package/react-datepicker

function Search({data, setData}){

    let [name, setName] = useState("");
    let [certification, setCertification] = useState("");
    let [level, setLevel] = useState("");
    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");

    //remove irrelevent data from table
    function search(){
        let dataCopy = [...data];
        let size = dataCopy.length;

        for (let i = size-1; i > -1 ; i--){
            if ((name !== "") && (dataCopy[i].user_name.toLowerCase() !== name.toLowerCase())){
                dataCopy.splice(i,1);
                setData(dataCopy);
                continue;
            }

            if ((certification !== "") && (dataCopy[i].certification_name.toLowerCase() !== certification.toLowerCase())){
                dataCopy.splice(i,1);
                setData(dataCopy);
                continue;
            }

            if ((level !== "") && (dataCopy[i].level.toLowerCase() !== level.toLowerCase())){
                dataCopy.splice(i,1);
                setData(dataCopy);
                continue;
            }


            if (startDate != ""){
                if ((dataCopy[i].created_on_date.substring(0,4) <= startDate.getFullYear()) &&
                    (dataCopy[i].created_on_date.substring(6,7) <= startDate.getMonth()+1) && 
                    (dataCopy[i].created_on_date.substring(9,10) <= startDate.getDate())){
                        dataCopy.splice(i,1);
                        setData(dataCopy);
                        continue;
                    }

            }

            if (endDate != ""){
                if ((dataCopy[i].created_on_date.substring(0,4) >= endDate.getFullYear()) &&
                    (dataCopy[i].created_on_date.substring(6,7) >= endDate.getMonth()+1) && 
                    (dataCopy[i].created_on_date.substring(9,10) >= endDate.getDate())){
                        dataCopy.splice(i,1);
                        setData(dataCopy);
                        continue;
                    }
            }

        }
    }

    return(
        <Container>
            <Row>
                <Col>
                <Form.Group className="mb-3" id="name">
                <Form.Control 
                    type="text" 
                    placeholder="Name" 
                    value = {name}
                    onChange= { (event) => setName(event.target.value) } />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" id="certification">
                <Form.Control 
                    type="text" 
                    placeholder="Certification" 
                    value = {certification}
                    onChange= { (event) => setCertification(event.target.value) } />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" id="level">
                <Form.Control 
                    type="text" 
                    placeholder="Level" 
                    value = {level}
                    onChange= { (event) => setLevel(event.target.value) } />
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    Certification Date
                </Col>
                <Col>
                    <DatePicker placeholderText="Start Date" dateFormat='yyyy-MM-dd' selected={startDate} onChange={(date) => setStartDate(date)} />
                </Col><Col>
                    <DatePicker placeholderText="End Date" dateFormat='yyyy-MM-dd' selected={endDate} onChange={(date) => setEndDate(date)} />
                </Col><Col>
                <Button onClick={search}> Search </Button>
                </Col>
            </Row>

        </Container>
    )
}

export default Search;