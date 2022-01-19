import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { UserCertificationsActions } from '../../services/api/userCertificationsActions';

function CertificationTable({data, admin, setShowEditCert, setShowEditUser, setUser, setCertification, setNewUser, setNewCert, setUserCerts}) {
  let [table, setTable] = useState([]);

  useEffect(() => {
    addToTable();
  }, [data])

  async function getUserCerts(id){
    let list = [];
      let userCertifications = new UserCertificationsActions();
      userCertifications.findByUserId(id).then(res => {
        for (let data of res)
          list.push(data.certification_id.toString())
        })

        return list;
  }

  async function addToTable(){ 
    let temp = []; let i = 0;
    for (let line of data){
      //if user is admin, add editing option
      if (admin){
        let myCerts = await getUserCerts(line.user_id).then(res => { return res});

        temp.push(
          <tr key = {i++}>
              <td>
                {line.user_name}
                <Button variant="outline-light" size="sm" onClick={() => { setUser(line), setUserCerts(myCerts), setNewUser(false), setShowEditUser(true)}}>edit</Button>
              </td>
              <td>
                {line.certification_name}
                <Button variant="outline-light" size="sm" onClick={() => { setCertification(line), setNewCert(false), setShowEditCert(true)}}>edit</Button>
              </td>
              <td>{line.level}</td>
              <td>{line.created_on_date}</td>
              <td>{line.expiration_date}</td>
          </tr>
        )}

        else{
          temp.push(
            <tr key = {i++}>
                <td>{line.user_name}</td>
                <td>{line.certification_name}</td>
                <td>{line.level}</td>
                <td>{line.created_on_date}</td>
                <td>{line.expiration_date}</td>
            </tr>
          )}
      }
    setTable(temp);
  }


  return(
    <Table id="team-table" striped bordered hover>
      <thead>
        <tr>
          <th>name</th>
          <th>Certification</th>
          <th>Level</th>
          <th>Certification date</th>
          <th>Expiration date</th>
        </tr>
      </thead>
      <tbody>
        {table} 
      </tbody>
    </Table>
  );
}

export default CertificationTable;

