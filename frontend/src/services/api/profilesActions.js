import { Api, client } from "./api";
import { UserActions } from "./userActions";
import { UserCertificationsActions } from "./userCertificationsActions";

// https://daily.dev/blog/a-guide-to-writing-clean-api-calls-using-axios

//Api endpoint for profiles table
const ENDPOINT = "profiles"

//API actions. using template method. tempale and default actions defined in Api class.
export class ProfilesActions extends Api{
    constructor() {
        super(ENDPOINT)
    }
    
    //returns data with user_id = name
    async findByUserName(name){
        let dataArray;
        try{
            await client.get(this.endpoint+ '/?user_name=' +name).then(res => {
                dataArray =  res.data;
            });
            return dataArray;
        }
        catch {
            return null;
        }
    }

    async printableDataHook(dataArray, size){

        let printableData = [];

        for (let data of dataArray)
        printableData.push({
            user_id: data.user_id,
            user_name: data.user_name,
            is_admin: data.is_admin,
            role: data.role,
            image: data.image})

        return printableData;
    }

    async createUser(userInfo, profileInfo, certifications){
        let id;
        let user = new UserActions();
        let userCerts = new UserCertificationsActions();

        //create user
        await user.createData(userInfo).then(res => {
            //get id for profile from user
            id = res.data.id
        })
        
        //create profile
        await this.updateIdWithData(id, profileInfo);

        //create user-certifications
        if (certifications.length > 0){
            for (let cert of certifications){
                await userCerts.createData({certification_id: parseInt(cert), user_id:id});
            }
        }

    }

    async edit(id, password, profileInfo, certifications){

        let user = new UserActions();
        let userCerts = new UserCertificationsActions();

        //changed password
        if (password != "")
            await user.updateIdWithData(id, {password: password}).then(res => (console.log(res)))

        await this.updateIdWithData(id, profileInfo).then(res => (console.log(res)));

        //compare users current certifications to ones selected and add/remove as needed
        await userCerts.findByUserId(id).then(res => {

            //delete certifications
            for (let currentCert of res){
                let found = false;

                for (let selecetedCert of certifications){
                    //current certification was also selected
                    if (currentCert.certification_id == parseInt(selecetedCert)){
                        found = true;
                        break;
                    }
                }
                //current certification was no selected -> delete
                if (!found)
                    userCerts.DeleteId(currentCert.id)

            }

            //add new selected certifications
            for (let selecetedCert of certifications){

                let found = false;

                for (let currentCert of res){
                    //selected certification already exists
                    if (currentCert.certification_id == parseInt(selecetedCert)){
                        found = true;
                        break;
                    }
                }
                //create new user certification
                if (!found)
                    userCerts.createData({certification_id: parseInt(selecetedCert), user_id:id});
            }
        })

    }
}