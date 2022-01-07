import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import getCertsData from "../services/redux/getCertsData";
import getTrainingsData from "../services/redux/getTrainingsData";
import Navigation from '../components/Navigation';
import CertificationBox from "../components/getCertified/CertificationBox";

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
    //check if certifications is theoretical
    for (let cert of certifications){
        if (!cert.practical) {
            data = {id: cert.id, name: cert.name}
            certList.push(<CertificationBox key={cert.id} data={data}/>)
        }
    }

    return certList;
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