import { Api, client } from "./api";

// https://daily.dev/blog/a-guide-to-writing-clean-api-calls-using-axios

//Api endpoint for profiles table
const ENDPOINT = "levels"

//API actions. using template method. tempale and default actions defined in Api class.
export class LevelActions extends Api{
    constructor() {
        super(ENDPOINT)
    }

    async findByScale(scale){
        let dataArray;
        try{
            await client.get(this.endpoint+ '/?scale=' +scale).then(res => {
                dataArray =  res.data;
            });
            return dataArray;
        }
        catch {
            return null;
        }
    }

}