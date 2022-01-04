import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { CertificationsActions } from "../services/api/certificationsActions";
import getInstructorData from "../services/redux/getInstructorData"
import Navigation from '../components/Navigation';
import PracticalBox from "../components/train/practicalBox";
import TheoreticalBox from "../components/train/theoreticalBox";

function Train () {
  let instructor_for = useSelector((state) => state.user.value.instructorFor);
  let [elementList, setElementList] = useState([]);
  let [certificationList, setCertificationsList] = useState([]);
  let [firstRender, setFirstRender] = useState(true); 

  getInstructorData();

  if (firstRender){
    setFirstRender(false);
    getTrainingInfo();
  }

  useEffect(() => {
    showTrainings();
  }, [instructor_for, certificationList])

  async function getTrainingInfo(){
    let certification = new CertificationsActions();
    if (!instructor_for){
      return setCertificationsList(null);
    }

    let size = instructor_for.length;
    let temp = [];
    for (let i = 0; i < size ; i++){
      await certification.getId(instructor_for[i]).then(res => {
        temp.push({certification_id: instructor_for[i], practical:res.practical, name: res.name})
      })
    }
    setCertificationsList(temp);
  }

  function showTrainings(){
    if (!certificationList[0]){
      return setElementList(<p>you are not an instructor</p>);
    }

    let size = certificationList.length;
    let temp = [];
    for (let i = 0; i < size ; i++){
      if (certificationList[i].practical)
        temp.push(<PracticalBox key={i} data={{cert_id: certificationList[i].certification_id, name: certificationList[i].name}} />)
      
      else
        temp.push(<TheoreticalBox key={i} data={{cert_id: certificationList[i].certification_id, name: certificationList[i].name}} />)
    }
    setElementList(temp);
  }

  return(
      <div>
        <Navigation />
        <h1>Train Page</h1>
        { elementList }
      </div>
    );
}

export default Train;