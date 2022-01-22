//import certificationsSlice from "../redux/certificationsSlice";
import { Api, client } from "./api";
import { LevelActions } from "./levelActions"
import { ScaleActions } from "./scalesActions";
import { InstructorsActions } from "./instructorsActions";

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

    async createNew(data, certTrainers){

        let certId = await this.createData(data).then(res => {
            return res.data.id;
        })

        let instructor = new InstructorsActions();

        //create trainers for this certification
        for (let user of certTrainers){
            instructor.createData({user_id: parseInt(user), certification_id:certId})
        }
    }

    async edit(id, data, certTrainers){
         //edit certification data
         this.updateIdWithData(id, data);
        
         let instructor = new InstructorsActions();
         //compare certifications current instructors to ones selected and add/remove as needed
         await instructor.findByCertId(id).then(res => {

         //delete instructor
         for (let currentInstractor of res){
             let found = false;

             for (let selecetedInstructor of certTrainers){
                 //current instrucot was also selected
                 if (currentInstractor.user_id == parseInt(selecetedInstructor)){
                     found = true;
                     break;
                 }
             }
             //current instructor was no selected -> delete
             if (!found)
                 instructor.DeleteId(currentInstractor.id)

         }

         //add new selected instroctors
         for (let selecetedInstructor of certTrainers){

             let found = false;

             for (let currentInstractor of res){
                 //selected instructor already exists
                 if (currentInstractor.user_id == parseInt(selecetedInstructor)){
                     found = true;
                     break;
                 }
             }
             //create new instructor
             if (!found)
                 instructor.createData({user_id: parseInt(selecetedInstructor), certification_id:id})
         }
     })

    }
}