import React, {useState} from "react";
import Navigation from '../components/Navigation';
import CertificationTable from "../components/team/CertificationTable";
import Search from "../components/team/Search";
import { UserCertificationsActions } from '../services/api/userCertificationsActions'

function Team(){

  let [data, setData] = useState([]);
  let [firstRender, setFirstRender] = useState(true);

  if (firstRender){
    setFirstRender(false);
    getData();
  }

  async function getData(){ 
    let certifications = new UserCertificationsActions();
    await certifications.printableData().then(response => {
      setData(response);
    })
  }

  return (
    <div>
      <Navigation />
      <h1>Team Page</h1>
      <Search data={data} setData={setData} />
      <CertificationTable data={data} />
    </div>
  );
}

export default Team;