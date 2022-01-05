//import certificationsSlice from "../redux/certificationsSlice";
import { Api, client } from "./api";
import { CertificationsActions } from "./certificationsActions";

// https://daily.dev/blog/a-guide-to-writing-clean-api-calls-using-axios

//Api endpoint for training modules table
const ENDPOINT = "training-modules"

//API actions. using template method. tempale and default actions defined in Api class.
export class TrainingModulesActions extends Api{
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

    //     //EDIT - not array option
    async printableDataHook(dataArray, size){

        let certsList = new CertificationsActions();
        
        //let printableData = [size];
        let printableData = [];
        let cert_id; let cert_name;

        for (let data of dataArray){
            cert_id = data.certification_id
            
            //find cert name for cert_id
            await certsList.getId(cert_id).then(res => {
                cert_name = res.data[0].name;
            })

            // for (let j = 0; j < certs.length; j++){
            //     if (certs[j].id == cert_id)
            //         cert_name = certs[j].name
            // }

            printableData.push({
                id: data.id,
                name: data.name,
                certification_id: cert_id,
                certification_name: cert_name})
        }
        
        return printableData;
        }
        
    //     for (let i = 0; i < size; i++)
    //     {
    //         cert_id = dataArray[i].certification_id
            
    //         //find cert name for cert_id
    //         await certsList.getId(cert_id).then(res => {
    //             cert_name = res.data[0].name;
    //         })

    //         // for (let j = 0; j < certs.length; j++){
    //         //     if (certs[j].id == cert_id)
    //         //         cert_name = certs[j].name
    //         // }

    //         printableData[i] = ({
    //             id: printableData[i].id,
    //             name: printableData[i].name,
    //             certification_id: cert_id,
    //             certification_name: cert_name})
    //     }
        
    //     return printableData;
    // }
}