//import certificationsSlice from "../redux/certificationsSlice";
import { Api, client } from "./api";
import { ProfilesActions } from "./profilesActions";
import { CertificationsActions } from "./certificationsActions";

// https://daily.dev/blog/a-guide-to-writing-clean-api-calls-using-axios

//Api endpoint for user certifications table
const ENDPOINT = "user-certifications"

//API actions. using template method. tempale and default actions defined in Api class.
export class UserCertificationsActions extends Api{
    constructor() {
        super(ENDPOINT)
    }

    async findByCertificationId(id){
        let dataArray;
        try{
            await client.get(this.endpoint+ '/?certification_id=' +id).then(res => {
                dataArray =  res.data;
            });
            return dataArray;
        }
        catch {
            return null;
        }
    }

    async findByUserAndCert(user, cert){
        let dataArray;
        try{
            await client.get(this.endpoint+ '/?certification_id=' +cert +'&user_id=' +user).then(res => {
                dataArray =  res.data;
            });
            return dataArray;
        }
        catch {
            return null;
        }
    }

    async printableDataHook(dataArray){
        let profilesList = new ProfilesActions();
        let certsList = new CertificationsActions();
        
        let printableData = [];
        let id; let name; let cert_id; let cert_name; let practical;

        for (let data of dataArray){
            id = data.user_id
            cert_id = data.certification_id

             //find name for user_id
             await profilesList.getId(id).then(res => {
                name = res.user_name
            })

            //find certification info for cert_id
            await certsList.getId(cert_id).then(res => {
                cert_name = res.name,
                practical = res.practical
            })


            printableData.push({
                user_id: id,
                user_name: name,
                certification_id: cert_id,
                certification_name: cert_name, 
                level: data.level,
                created_on_date: data.created_on_date,
                expiration_date: data.expiration_date,
                days_until_expires: data.days_until_expires,
                practical: practical,
            })
        }
        return printableData;
    }

    async renewAll(id){
        let userCerts = [];
        let today = new Date();
        let date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();

        await this.findByCertificationId(id).then(res => {
            for (let data of res){
                userCerts.push(data.id)
            }

        for (let cert of userCerts)
            this.updateIdWithData(cert, {created_on_date: date, entered_level:"Pending"})
        })

    }

    async renewUser(user_id, certification_id){
        let today = new Date();
        let date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();

        let userCert = await this.findByUserAndCert(user_id,certification_id).then(res => {
            return res[0].id;
        })

        this.updateIdWithData(userCert, {created_on_date: date, entered_level:"Pending"})
    }
}