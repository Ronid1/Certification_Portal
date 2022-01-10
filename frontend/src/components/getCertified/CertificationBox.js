import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import TrainingBar from "./trainingBar";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Accordion from 'react-bootstrap/Accordion';


function CertificationBox({data}) {

    const certId = data.id;
    let [now, setNow] = useState(0);
    let [trainingList, setTrainingList] = useState([]);
    let trainings = useSelector((state) => state.certifications.value.trainings);  
  
    const numOfTrainings = trainings.length;
    useEffect(() => {
        setTrainingList(addToList());

        let done = 0;
        for (let training of trainings)
            training.completed ? done++: null

        setNow(Math.round((done/numOfTrainings)*100));
    }, [trainings])

    function addToList() {
        let data;
        let tempList = [];
        //add all trainings for this certification to list
        for (let i = 0; i < numOfTrainings ; i++)
        {
            if (trainings[i].certification_id == certId){
                data = {user_training_id: trainings[i].user_training_id, name: trainings[i].name, status: trainings[i].completed, link: trainings[i].link}
                tempList.push(<TrainingBar key={i} data = {data} />)
            }

        }
        return tempList;
    }

    
    return(
        <Accordion>
        <Accordion.Item>
            <Accordion.Header>
                {data.name}
            </Accordion.Header>
            <Accordion.Body>
                <ProgressBar 
                    variant="success"
                    now={now} 
                    label={`${now}%`} />
                    <p />
                { trainingList }
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
    )
}




export default CertificationBox;