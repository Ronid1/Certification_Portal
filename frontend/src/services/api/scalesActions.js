//import certificationsSlice from "../redux/certificationsSlice";
import { Api, client } from "./api";

// https://daily.dev/blog/a-guide-to-writing-clean-api-calls-using-axios

//Api endpoint for certifications table
const ENDPOINT = "scales"

//API actions. using template method. tempale and default actions defined in Api class.
export class ScaleActions extends Api{
    constructor() {
        super(ENDPOINT)
    }

    async getScaleByName(name){
        let dataArray;
        try{
            await client.get(this.endpoint+ '/?scale_name=' +name).then(res => {
                dataArray =  res.data;
            });
            return dataArray;
        }
        catch {
            return null;
        }

    }

}