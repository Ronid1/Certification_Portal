import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function CertificationTable({data, admin, setShowEditCert, setShowEditUser, setUser, setCertification, setNewUser}) {
  let [table, setTable] = useState([]);

  useEffect(() => {
    addToTable();
  }, [data])

  function addToTable(){ 
    let temp = []; let i = 0;
    for (let line of data){
      //if user is admin, add editing option
      if (admin){
        temp.push(
          <tr key = {i++}>
              <td>
                {line.user_name}
                <Button variant="outline-light" size="sm" onClick={() => { setUser(line), setNewUser(false), setShowEditUser(true)}}>edit</Button>
              </td>
              <td>
                {line.certification_name}
                <Button variant="outline-light" size="sm" onClick={() => setShowEditCert(true)}>edit</Button>
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

