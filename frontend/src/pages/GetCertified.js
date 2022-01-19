import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import getCertsData from "../services/redux/getCertsData";
import getTrainingsData from "../services/redux/getTrainingsData";
import Navigation from '../components/Navigation';
import CertificationBox from "../components/getCertified/CertificationBox";
import Alert from 'react-bootstrap/Alert';

function GetCertified() {

  let [theoreticalCert, setTheoreticalCert] = useState([]);
  let certifications = useSelector((state) => state.certifications.value.certifications);

  getCertsData();
  getTrainingsData();

  useEffect(() => {
    setTheoreticalCert(addToList());
  }, [certifications])

  function addToList() {
    let certList = []; let data;

    //if user dosn't have any certifications to go through
    if (!certifications[0]){
      return <Alert key="1" variant="danger">you don't have any certifications</Alert>;
    }
    //check if certifications is theoretical
    for (let cert of certifications){
        if (!cert.practical) {
            data = {id: cert.id, name: cert.name}
            certList.push(<CertificationBox key={cert.id} data={data}/>)
        }
    }
    //if mo theoretical certs
    if (!certList[0])
      certList.push (<Alert key="2" variant="danger">you don't have any certifications</Alert>);
    
      return certList;
}

  return (
    <div>
      <Navigation />
      <h1>Get Certified</h1>
      {theoreticalCert}
    </div>
  )
}

export default GetCertified;