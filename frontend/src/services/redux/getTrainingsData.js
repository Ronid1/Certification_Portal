import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {UserTrainingsActions} from "../api/userTrainingsActions"
import { getTrainings } from "../redux/certificationsSlice";

function getTrainingsData(){

  const user_id = useSelector((state) => state.user.value.id);
  const dispatch = useDispatch();
  const idsList = [];
  const [trainingList, setTrainingList] = useState([]);
  const [fetching, setFetching] = useState(true);
 
  if (fetching){
    setFetching(false);
    getData();
  }

  //add to state
  dispatch(getTrainings(trainingList));
  return trainingList;

  async function getData(){
    let userTrainings = new UserTrainingsActions();
    let thisUserTrainings = new UserTrainingsActions();

    //get trainings user has: (training id)
    await userTrainings.findByUserId(user_id).then( response => {

      for (let res of response)
        idsList.push(res.id)
    });
    
    //get all data for each training user has
    for (let id of idsList){
      await thisUserTrainings.printableData(id).then( ans => {
          setTrainingList (oldList=> [...oldList, {
            training_id: ans[0].training_id,
            certification_id: ans[0].certification_id,
            name: ans[0].training_name,
            completed: ans[0].completed}
          ]);
        })
    }
  }
}

export default getTrainingsData;