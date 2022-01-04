import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import getCertsData from "../services/redux/getCertsData";
import getTrainingsData from "../services/redux/getTrainingsData";
import Navigation from '../components/Navigation';
import CertificationBox from "../components/getCertified/CertificationBox";

function GetCertified() {

  let [theoreticalCert, setTheoreticalCert] = useState([]);
  let certifications = useSelector((state) => state.certifications.value.certifications);
  //let trainings = useSelector((state) => state.certifications.value.trainings);

  getCertsData();
  getTrainingsData();

  useEffect(() => {
    setTheoreticalCert(addToList());
  }, [certifications])

  function addToList() {
    let tempList = []; let data;

    //check if certifications is theoretical
    const certsSize = certifications.length;
    for (let i = 0; i < certsSize ; i++)
    {
        if (!certifications[i].practical) {
            data = {id: certifications[i].id, name: certifications[i].name}
            tempList.push(<CertificationBox key={i} data={data}/>)
        }
    }

    return tempList;
}



  return (
    <div>
      <Navigation />
      <h1>Get Certified Page</h1>
      {theoreticalCert}
    </div>
  )
}

export default GetCertified;