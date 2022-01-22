//import certificationsSlice from "../redux/certificationsSlice";
import { Api, client } from "./api";
import {LevelActions} from "./levelActions"
import { ScaleActions } from "./scalesActions";

// https://daily.dev/blog/a-guide-to-writing-clean-api-calls-using-axios

//Api endpoint for certifications table
const ENDPOINT = "certifications"

//API actions. using template method. tempale and default actions defined in Api class.
export class CertificationsActions extends Api{
    constructor() {
        super(ENDPOINT)
    }

    async getScaleLevel(id){

        let scaleName; let data=[];
        await this.getId(id).then(res => {
            scaleName = res.level_scale;
        })
        
        let scale = new ScaleActions();
        let scaleId;
        await scale.getScaleByName(scaleName).then(res => {
            scaleId = res[0].id
        })

        let getlevels = new LevelActions();
        await getlevels.findByScale(scaleId).then(res => {
            for (let element of res){
                data.push({id:element.id, level:element.level})
            }
        })
        return data;
    }


    async printableDataHook(dataArray, size) {

        let printableData=[];

        for (let data of dataArray)
            printableData.push({
                id: data.id,
                name: data.name,
                part: data.part,
                level_scale: data.level_scale,
                days_valid: data.days_valid})

        return printableData;
    }
}