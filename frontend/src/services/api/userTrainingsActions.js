//import certificationsSlice from "../redux/certificationsSlice";
import { Api, client } from "./api";
import { ProfilesActions } from "./profilesActions";
import { TrainingModulesActions } from "./trainingModulesActions";

// https://daily.dev/blog/a-guide-to-writing-clean-api-calls-using-axios

//Api endpoint for user trainings table
const ENDPOINT = "user-trainings"

//API actions. using template method. tempale and default actions defined in Api class.
export class UserTrainingsActions extends Api{
    constructor() {
        super(ENDPOINT)
    }

    async printableDataHook(dataArray, size, byId){
        
        let profilesList = new ProfilesActions();
        let modulesList = new TrainingModulesActions();
        
        //let printableData = [size];
        let printableData = [];
        let id; let name; let training_id; let training_name; let cert_id; let link;
        // return [user name, certification name, training name, completed] 

        for (let data of dataArray){
            id = data.user_id
            training_id = data.training_id


            //find name for user_id
            await profilesList.getId(id).then(res => {
                name = res.user_name
            })

            //find training name for training_id
            await modulesList.getId(training_id).then(res => {
                training_name = res.name
                cert_id = res.certification_id
                link = res.link
            })

            printableData.push({
                user_id: id,
                user_name: name,
                certification_id: cert_id,
                training_id: training_id,
                training_name: training_name,
                link: link,
                completed: data.completed})
        }
        return printableData;
    }
}