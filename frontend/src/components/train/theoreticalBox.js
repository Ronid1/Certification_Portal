import React, {useState, useEffect} from "react";
import { TrainingModulesActions } from "../../services/api/trainingModulesActions"
import AddTraining from "./addTraining";
import Accordion from 'react-bootstrap/Accordion';
import EditTraining from "./editTraining";
import Button from 'react-bootstrap/Button';


function TheoreticalBox ({data}) {
    const certification = data.cert_id;
    let [firstRender, setFirstRender] = useState(true)
    let [trainingsList, setTrainingsList] = useState([]);
    let [componentList, setComponentList] = useState([]);
    let [showAdd, setShowAdd] = useState(false);

    if (firstRender){
        setFirstRender(false)
        getTrainings()
    }

    useEffect(() => {
        createComponents();
    }, [trainingsList, firstRender]);

    //get all trainings that belong to this certification
    async function getTrainings(){
        const trainings = new TrainingModulesActions();
        let tempList = [];

        await trainings.findByCertId(certification).then(res => {
            for (let element of res){
                tempList.push({
                    id: element.id,
                    name: element.name,
                    file: element.file
                })
            }

            setTrainingsList(tempList);
        })
    }

    //create editTraining componenets to render
    function createComponents(){
        let tempList = [];
        for (let training of trainingsList){
            tempList.push(<EditTraining key={training.id} data={training} />)
        }

        setComponentList(tempList)
    }


    return(
        <>
        <AddTraining show={showAdd} setShow={setShowAdd} certificationId={certification} />
        <Accordion id="training-box" defaultActiveKey="0">
            <Accordion.Item>
                <Accordion.Header>
                    {data.name}
                </Accordion.Header>
                <Accordion.Body>
                    <Button id="add-training-btn" variant="light" onClick={() => setShowAdd(true)}>+ Add training</Button>
                { componentList }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </>
    );


}

export default TheoreticalBox;