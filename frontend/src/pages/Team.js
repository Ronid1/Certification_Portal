import React, {useState} from "react";
import { useSelector } from "react-redux";
import Navigation from '../components/Navigation';
import CertificationTable from "../components/team/CertificationTable";
import Search from "../components/team/Search";
import EditUser from "../components/team/editUser";
import EditCerttification from "../components/team/EditCertification";
import { UserCertificationsActions } from '../services/api/userCertificationsActions'
import Button from 'react-bootstrap/Button'

function Team(){

  let [data, setData] = useState([]);
  let [firstRender, setFirstRender] = useState(true);
  let admin = useSelector((state) => state.user.value.isAdmin);
  let [adminActions, setAdminActions] = useState([]);
  let [showEditUser, setShowEditUser] = useState(false);
  let [showEditCert, setShowEditCert] = useState(false);
  let [newUser, setNewUser] = useState(true);
  let [newCert, setNewCert] = useState(true);
  let [user, setUser] = useState("");
  let [certification, setCertification] = useState("");
  let [userCerts, setUserCerts] = useState([]);


  if (firstRender){
    setFirstRender(false);
    adminPermissions();
    getData();
  }

  async function getData(){ 
    let certifications = new UserCertificationsActions();
    await certifications.printableData().then(response => {
      setData(response);
    })
  }

  function adminPermissions(){
    if (admin){
      setAdminActions([ 
        <Button key="user" variant="light" onClick={() => {setNewUser(true), setShowEditUser(true)}}>+ Add User</Button>,
        <Button key="cert" variant="light" onClick={() => {setShowEditCert(true), setNewCert(true)}}>+ Add Certification</Button>
      ])
    }
  }

  return (
    <div>
      <Navigation />
      <EditUser show={showEditUser} setShow={setShowEditUser} newUser={newUser} setNewUser={setNewUser} data={user} userCertifications={userCerts}/>
      <h1>Team Page</h1>
      <EditCerttification show={showEditCert} setShow={setShowEditCert} newCert={newCert} data={certification}/>
      {adminActions}
      <Search data={data} setData={setData} />
      <CertificationTable data={data} admin={admin} 
        setShowEditCert={setShowEditCert} setShowEditUser={setShowEditUser}
        setUser={setUser} setCertification={setCertification} setNewUser={setNewUser}
        setNewCert={setNewCert} setUserCerts={setUserCerts}
      />
    </div>
  );
}

export default Team;