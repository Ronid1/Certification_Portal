import React, { Component } from 'react';
//import { getTablePending, getTableSuccess, getTableFailed } from '../services/redux/certificationsSlice';
//import { useDispatch } from 'react-redux';
import { UserCertificationsActions } from '../../services/api/userCertificationsActions';

function CertificationTable() {
  //const dispatch = useDispatch();
  //dispatch(getUserCertifications());

  let data = new UserCertificationsActions();
  console.log(data.toString());


  return(
  <div>
    <h1>certification table</h1>
  </div>
  );
}

export default CertificationTable;

