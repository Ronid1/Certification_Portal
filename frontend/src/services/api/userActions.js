//import certificationsSlice from "../redux/certificationsSlice";
import { Api ,client} from "./api";

// https://daily.dev/blog/a-guide-to-writing-clean-api-calls-using-axios

//Api endpoint for certifications table
const ENDPOINT = "users"

//API actions. using template method. tempale and default actions defined in Api class.
export class UserActions extends Api{
    constructor() {
        super(ENDPOINT)
    }

    //login user to system using email and password
    async login(email, password) {
        let user;
        
        try{
            await client.get(this.endpoint+ "/?email=" + email + "&password=" + password).then( res =>{
                user = res.data[0].id;
            });
            return user;
        }
        catch{
            return null;
        }
    }

    //change users password by matching old password to current password and then setting new password
    async changePassword(id, oldPassword, newPassword) {
        //check if oldPassword excisted
        let success = true;
        try{
            await client.get(this.endpoint + "/?id="+ id + "&password=" + oldPassword ).then( res =>{ 
                if (res.data.length < 1)
                    success = false
            });
        }
        catch{
            return false;
        }

        //failuer
        if (!success)
            return false

        //change password
        await this.updateIdWithData(id, {password: newPassword})
        
        //success
        return true;
    }
}