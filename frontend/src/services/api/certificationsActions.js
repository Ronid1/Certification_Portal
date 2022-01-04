//import certificationsSlice from "../redux/certificationsSlice";
import { Api, client } from "./api";
import {LevelActions} from "./levelActions"

// https://daily.dev/blog/a-guide-to-writing-clean-api-calls-using-axios

//Api endpoint for certifications table
const ENDPOINT = "certifications"

//API actions. using template method. tempale and default actions defined in Api class.
export class CertificationsActions extends Api{
    constructor() {
        super(ENDPOINT)
    }

    async getScaleLevel(id){

        let scale; let data=[];
        await this.getId(id).then(res => {
            scale = res.level_scale;
        })
        let getlevels = new LevelActions();

        await getlevels.findByScale(scale).then(res => {
            let size = res.length;
            for (let i=0; i<size ; i++){
                data[i] = {id: res[i].id, level:res[i].level}
            }
        })
        return data;
    }


    //EDIT - not array option
    async printableDataHook(dataArray, size) {

        let printableData = [size];

        for (let i = 0; i < size; i++)
        {
            printableData[i]=({
                id: dataArray[i].id,
                name: dataArray[i].name,
                part: dataArray[i].part,
                level_scale: dataArray[i].level_scale,
                days_valid: dataArray[i].days_valid})
        }

        return printableData;
    }
}