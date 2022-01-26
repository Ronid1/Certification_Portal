import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import getCertsData from "../../services/redux/getCertsData"
import CertificationBox from "./certificationBox";
import Container from "react-bootstrap/esm/Container";

function AllCertifications(){
 
  let [list, setList] = useState([]);
  const certifications = useSelector((state) => state.certifications.value.certifications);

  getCertsData();
 
  useEffect(() => {
    setList(addToList());
  }, [certifications])

    return(
        <Container>
          {list}
        </Container>
    );

    function addToList() {
      let data;
      let certList = [];
      //user doesn't have any certifications
      if (!certifications[0]){
        return(<p>No certifications found</p>)
      }
      //add certification component to list
      for (let cert of certifications) {
        //if a cert is theoretical and pending or fail status - dont include it
        if (!cert.practical && cert.level!='Pass' && cert.days_until_expires>30){
          continue;
        }

        data = {name: cert.name, level: cert.level, date: cert.created_on_date, expires: cert.days_until_expires , certId: cert.id}
        certList.push(<CertificationBox key={cert.id} data = {data} />)
      }
  
      return certList;
  }
}

export default AllCertifications;