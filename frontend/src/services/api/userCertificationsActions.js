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

    //TO DO
    //return an experation date of a specific users certifications
    getCertExprationDate(user_id, cert_id){}

    async printableDataHook(dataArray, size, byId){
        let profilesList = new ProfilesActions();
        let certsList = new CertificationsActions();
        
        let printableData = [size];
        let id; let name; let cert_id; let cert_name;
        let level; let date; let valid; let expiration_date; let days_until_expires; let practical;

        // return [user name, certification name, training name, completed] 
        for (let i = 0; i < size; i++)
        {
            if (byId){
                id = dataArray.user_id
                cert_id = dataArray.certification_id
                level = dataArray.level
                date = dataArray.created_on_date
                expiration_date = dataArray.expiration_date
                days_until_expires=dataArray.days_until_expires
            }

            else{
                id = dataArray[i].user_id
                cert_id = dataArray[i].certification_id
                level = dataArray[i].level
                date = dataArray[i].created_on_date
                expiration_date = dataArray[i].expiration_date
                days_until_expires = dataArray[i].days_until_expires
            }

            //find name for user_id
            await profilesList.getId(id).then(res => {
                name = res.user_name
            })

            //find certification info for cert_id
            await certsList.getId(cert_id).then(res => {
                cert_name = res.name,
                valid = res.valid
                practical = res.practical
            })


            printableData[i]=({
                user_id: id,
                user_name: name,
                certification_id: cert_id,
                certification_name: cert_name, 
                level: level,
                created_on_date: date,
                expiration_date: expiration_date,
                days_until_expires: days_until_expires,
                practical: practical,
                valid: valid})
        }

        return printableData;
    }
}