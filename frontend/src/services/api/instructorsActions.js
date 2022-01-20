//import certificationsSlice from "../redux/certificationsSlice";
import { Api, client } from "./api";
import { ProfilesActions } from "./profilesActions";
import { CertificationsActions } from "./certificationsActions";

// https://daily.dev/blog/a-guide-to-writing-clean-api-calls-using-axios

//Api endpoint for instuctors table
const ENDPOINT = "instructors"

//API actions. using template method. tempale and default actions defined in Api class.
export class InstructorsActions extends Api{
    constructor() {
        super(ENDPOINT)
    }

    async findByCertId(id){
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

    async printableDataHook(dataArray, size){
        let profilesList = new ProfilesActions();
        let certsList = new CertificationsActions();

        //let printableData = [size];
        let printableData=[];
        let id; let cert_id; let name; let cert_name;
        //only saving following data: user_id, user_name, cert_id, cert_name;

        for (let data of dataArray){
            id = data.user_id
            cert_id = data.certification_id

            //find name for user_id
            await profilesList.findByUserId(id).then(res => {
                name = res.data[0].user_name
            })

            //find cert name for cert_id
            await certsList.getId(cert_id).then(res => {
                cert_name = res.data[0].name;
            })

            printableData.push({
                user_id: id,
                user_name: name,
                certification_id: cert_id,
                certification_name: cert_name})
        }

        return printableData;
    }
}