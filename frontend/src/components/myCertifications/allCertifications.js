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

      const size = certifications.length;
      //add certification component to list
      for (let i = 0; i < size ; i++) {
        //if a cert is practical and pending or fail status - dont include it
        if (certifications[i].practical && certifications[i].level!='Pass'){
          continue;
        }

        data = {name: certifications[i].name, level: certifications[i].level, date: certifications[i].created_on_date}
        certList.push(<CertificationBox key={i} data = {data} />)
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