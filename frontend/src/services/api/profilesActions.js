import { Api } from "./api";

// https://daily.dev/blog/a-guide-to-writing-clean-api-calls-using-axios

//Api endpoint for profiles table
const ENDPOINT = "profiles"

//API actions. using template method. tempale and default actions defined in Api class.
export class ProfilesActions extends Api{
    constructor() {
        super(ENDPOINT)
    }
    
    //EDIT - not array option
    async printableDataHook(dataArray, size){

        //let printableData = [size];
        let printableData = [];

        for (let data of dataArray)
        printableData.push({
            user_id: data.user_id,
            user_name: data.user_name,
            is_admin: data.is_admin,
            role: data.role,
            image: data.image})

        //only saving following data: user_id, name, is_admin, role, image;
        // for (let i = 0; i < size; i++)
        // {
        //     printableData[i]=({
        //         user_id: dataArray[i].user_id,
        //         user_name: dataArray[i].user_name,
        //         is_admin: dataArray[i].is_admin,
        //         role: dataArray[i].role,
        //         image: dataArray[i].image})
        // }

        return printableData;
    }
}