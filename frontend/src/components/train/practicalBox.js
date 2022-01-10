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
        let temp = [];
        let i = 0;
        for (let user of usersList){
            data={
                user_certification_id: user. user_certification_id,
                user_name: user.user_name, 
                id: certification, 
                level: user.level}
            
            temp.push(<UserLevel key={i++} data={data} />)
        }
        setUserLevelList(temp);
    }

    //find all users that have this certification
    //for each user get id and level
    async function getUsersWithCert(){

        let usersLevelsList = [];

        const userCerts = new UserCertificationsActions();
        await userCerts.findByCertificationId(certification).then(res => {
            for (let element of res){
                usersLevelsList.push({
                    user_certification_id: element.id,
                    user_id: element.user_id,
                    level: element.level
                })
            }
        })
        const profile = new ProfilesActions();
        let usersWithCertification = []
        //get user name
        for (let user of usersLevelsList){
            await profile.getId(user.user_id).then(res =>{
                usersWithCertification.push({
                    user_certification_id: user.user_certification_id,
                    user_id: user.user_id,
                    level: user.level,
                    user_name: res.user_name
                })
            })
        }
        setUsersList(usersWithCertification)
    }

}

export default PracticalBox;