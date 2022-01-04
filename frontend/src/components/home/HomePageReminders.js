import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Reminder from "./Reminder";
import getCertsData from "../../services/redux/getCertsData";
import getTrainingsData from "../../services/redux/getTrainingsData";
import Container from "react-bootstrap/esm/Container";

function HomePageReminders() {

    let [list, setList] = useState([]);
    let trainings = useSelector((state) => state.certifications.value.trainings);
    let certifications = useSelector((state) => state.certifications.value.certifications);

    getTrainingsData();
    getCertsData();

    useEffect(() => {
        setList(addToList());
    }, [trainings, certifications])

    return(
        <Container>
            { list }
        </Container>
    );

    function addToList() {
        const CERT = true;
        let data; let i = 0;
        let reminderList = [];

        const size = trainings.length;
        //check if trainings is complete - if not, add to list of reminders
        for (i; i < size ; i++)
        {
            //training not completed -> add to stack
            if (!trainings[i].completed) {
                data = {type: !CERT, name: trainings[i].name, days: null}
                reminderList.push(<Reminder key={i} data = {data} />)
            }
        }

        //check if certifications is about to expire. if yes - add to list of reminders
        let days;
        const certsSize = certifications.length-1 + i;
        for (i; i < certsSize ; i++)
        {
            days = certifications[certsSize-i].days_until_expires
            //certificaion expiring soon -> add to stack
            if ( days < 30) {
                data = {type: CERT, name: certifications[certsSize-i].name, days: days}
                reminderList.push(<Reminder key={i} data = {data} />)
            }
        }



        return reminderList;
    }
}

export default HomePageReminders;