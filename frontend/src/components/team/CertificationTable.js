import React, {useState} from 'react';
import { UserCertificationsActions } from '../../services/api/userCertificationsActions';
import Table from 'react-bootstrap/Table'

function CertificationTable() {

  let certifications = new UserCertificationsActions();
  let [table, setTable] = useState([]);
  let [firstRender, setFirstRender] = useState(true);

  if (firstRender){
    setFirstRender(false);
    getData();
  }

  async function getData(){ 
    let temp = []; let i = 0;
    await certifications.printableData().then(response => {
    for (let data of response){
      temp.push(
        <tr key = {i++}>
            <td>{data.user_name}</td>
            <td>{data.certification_name}</td>
            <td>{data.level}</td>
            <td>{data.created_on_date}</td>
            <td>{data.expiration_date}</td>
        </tr>
      )}
    })
    setTable(temp);
  }


  return(
    <Table striped bordered hover>
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

