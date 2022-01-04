import React, {Component} from "react";
import Navigation from '../components/Navigation';
import CertificationTable from "../components/team/CertificationTable";

export default class Team extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navigation />
        <h1>Team Page</h1>
        <CertificationTable />
      </div>
    );
  }
}