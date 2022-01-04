//import certificationsSlice from "../redux/certificationsSlice";
import { Api } from "./api";
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

        //EDIT - not array option
    async printableDataHook(dataArray, size){
        //let profiles = []; let certs = []; let profilesList; let certsList;;
        let profilesList = new ProfilesActions();
        let certsList = new CertificationsActions();
        //await profilesList.then(res => {profiles = res});
        //await certsList.then(res => {certs = res})

        let printableData = [size];
        let id; let cert_id; let name; let cert_name;
        //only saving following data: user_id, user_name, cert_id, cert_name;
        for (let i = 0; i < size; i++)
        {

            id = dataArray[i].user_id
            cert_id = dataArray[i].certification_id
            
            //find name for user_id
            await profilesList.findByUserId(id).then(res => {
                name = res.data[0].user_name
            })
            // for (let k = 0; k < profiles.length; k++){
            //     if (profiles[k].user_id == id)
            //         name = profiles[k].user_name
            // }

            //find cert name for cert_id
            await certsList.getId(cert_id).then(res => {
                cert_name = res.data[0].name;
            })

            // for (let j = 0; j < certs.length; j++){
            //     if (certs[j].id == cert_id)
            //         cert_name = certs[j].name
            // }

            printableData[i]=({
                user_id: id,
                user_name: name,
                certification_id: cert_id,
                certification_name: cert_name})
        }

        return printableData;
    }
}