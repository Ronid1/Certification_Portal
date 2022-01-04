import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { InstructorsActions } from "../../services/api/instructorsActions";
import { updateInstructorFor } from "../redux/userSlice"

function getInstructorData(){
  const id = useSelector((state) => state.user.value.id);
  const dispatch = useDispatch();
  const [certsList, setCertsList] = useState([]);
  const [fetching, setFetching] = useState(true);
 
  if (fetching){
    setFetching(false);
    getData();
  }

  //add to state
  dispatch(updateInstructorFor(certsList));
  return certsList;

  async function getData(){
    let instructor = new InstructorsActions();
    let list = [];

    //get certifications user is instructor for
    await instructor.findByUserId(id).then( res => {
        let size = res.length

        for (let i = 0; i < size; i++){
            list[i] = res[i].certification_id
        }
    });
    setCertsList(list);
  }

}

export default getInstructorData;