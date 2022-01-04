import React, {useState, useEffect} from "react";
import UserLevel from "./userLevel";
import { UserCertificationsActions } from "../../services/api/userCertificationsActions"
import { ProfilesActions } from "../../services/api/profilesActions"
import Accordion from 'react-bootstrap/Accordion';

function PracticalBox ({data}) {
    const certification = data.cert_id;
    let [firstRender, setFirstRender] = useState(true)
    let [usersList, setUsersList] = useState([])
    let [userLevelList, setUserLevelList] = useState([]);

    if (firstRender){
        setFirstRender(false)
        getUsersWithCert();
    }

    useEffect(() => {
        addToUserLevelList();
    }, [usersList, firstRender]);

    return(
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    {data.name}
                </Accordion.Header>
                <Accordion.Body>
                { userLevelList }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );

    function addToUserLevelList(){
        let data;
        let size = usersList.length
        let temp = [];

        for (let i = 0; i < size; i++){
            data={
                user_name: usersList[i].user_name, 
                id: certification, 
                level: usersList[i].level}
            
            temp.push(<UserLevel key={i} data={data} />)
        }
        setUserLevelList(temp);
    }

    //find all users that have this certification
    //for each user get id and level
    async function getUsersWithCert(){

        let usersWithCertification = [];

        const userCerts = new UserCertificationsActions();
        await userCerts.findByCertificationId(certification).then(res => {
            let size = res.length;
            for (let i=0; i<size; i++){
                usersWithCertification[i]={
                    user_id: res[i].user_id,
                    level: res[i].level
                }
            }
        })
        let userSize = usersWithCertification.length;
        const profile = new ProfilesActions();

        //get user name
        for (let i = 0; i < userSize; i++){
            await profile.getId(usersWithCertification[i].user_id).then(res =>{
                usersWithCertification[i]={
                    user_id: usersWithCertification[i].user_id,
                    level: usersWithCertification[i].level,
                    user_name: res.user_name
                }
            })
        }

        setUsersList(usersWithCertification)
    }

}

export default PracticalBox;