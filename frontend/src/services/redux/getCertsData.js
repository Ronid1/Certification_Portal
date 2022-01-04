import React, { useState } from "react";
import { connectAdvanced, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UserCertificationsActions } from "../api/userCertificationsActions"
import { getCertifications } from "../redux/certificationsSlice";

function getCertsData(){
  const id = useSelector((state) => state.user.value.id);
  const dispatch = useDispatch();
  const idsList = [];
  const [certsList, setCertsList] = useState([]);
  const [fetching, setFetching] = useState(true);
 
  if (fetching){
    setFetching(false);
    getData();
  }

  //add to state
  dispatch(getCertifications(certsList));
  return certsList;

  async function getData(){
    let userCerts = new UserCertificationsActions();
    let thisUserCerts = new UserCertificationsActions();

    //get certifications user has
    await userCerts.findByUserId(id).then( res => {
      let size = res.length

      for (let i = 0; i < size; i++){
        idsList[i] = res[i].id
      }

    });

    let size = idsList.length;
    let user_cert_id;

    //get all data for each certifiction user has
    for (let i = 0; i < size; i++){
      user_cert_id = idsList[i];
      
        await thisUserCerts.printableData(user_cert_id).then( ans => {

          setCertsList (oldList=> [...oldList, {
            id: ans[0].certification_id,
            name: ans[0].certification_name,
            level: ans[0].level,
            practical: ans[0].practical,
            expiration_date: ans[0].expiration_date,
            days_until_expires: ans[0].days_until_expires,
            created_on_date: ans[0].created_on_date}
          
          ]);
        })
    }
  }

}

export default getCertsData;