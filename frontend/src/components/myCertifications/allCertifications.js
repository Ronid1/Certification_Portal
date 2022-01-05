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

      //add certification component to list
      for (let cert of certifications) {
        //if a cert is practical and pending or fail status - dont include it
        if (cert.practical && cert.level!='Pass'){
          continue;
        }

        data = {name: cert.name, level: cert.level, date: cert.created_on_date}
        certList.push(<CertificationBox key={cert.id} data = {data} />)
      }
  
      // TO DO:
      // mark certifications by:
      // about to expire
      // expired
      // level is certifeid

      return certList;
  }
}

export default AllCertifications;