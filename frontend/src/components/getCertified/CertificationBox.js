import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import TrainingBar from "./trainingBar";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Accordion from 'react-bootstrap/Accordion';


function CertificationBox({data}) {

    const certId = data.id;
    let [now, setNow] = useState(0);
    let [trainingList, setTrainingList] = useState([]);
    let [done, setDone] = useState(0);
    let trainings = useSelector((state) => state.certifications.value.trainings);  
  
    const numOfTrainings = trainings.length;

    useEffect(() => {
        setTrainingList(addToList());
        setNow(done/numOfTrainings);
    }, [trainings, done])

    function addToList() {
        let data;
        let tempList = [];

        //add all trainings fot this certification to list
        for (let i = 0; i < numOfTrainings ; i++)
        {
            if (trainings[i].certification_id == certId){
                data = {name: trainings[i].name, status: trainings[i].completed, file: null}
                tempList.push(<TrainingBar key={i} data = {data} />)
                
                if (trainings[i].completed)
                    setDone(done+1);
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