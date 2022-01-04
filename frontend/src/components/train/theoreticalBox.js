import React, {useState, useEffect} from "react";
import { TrainingModulesActions } from "../../services/api/trainingModulesActions"
import PracticalBox from "./practicalBox";
import Accordion from 'react-bootstrap/Accordion';
import EditTraining from "./editTraining";

function TheoreticalBox ({data}) {
    const certification = data.cert_id;
    let [firstRender, setFirstRender] = useState(true)
    let [trainingsList, setTrainingsList] = useState([]);
    let [componentList, setComponentList] = useState([]);

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
            let size = res.length

            for (let i = 0; i < size; i++){
                tempList[i] = {
                    id: res[i].id,
                    name: res[i].name,
                    file: res[i].file
                }
            }

            setTrainingsList(tempList);
        })
    }

    //create editTraining componenets to render
    function createComponents(){
        let size = trainingsList.length;
        let tempList = [];
        for (let i = 0; i < size; i++){
            tempList.push(<EditTraining key={i} data={trainingsList[i]} />)
        }

        setComponentList(tempList)
    }

    return(
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    {data.name}
                </Accordion.Header>
                <Accordion.Body>
                { componentList }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );


}

export default TheoreticalBox;