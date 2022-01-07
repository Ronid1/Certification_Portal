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

    async changePassword(id, oldPassword, newPassword) {
        //check if oldPassword excisted
        console.log("setting password")
        console.log("id="+id+" old password="+oldPassword+" new password="+newPassword)
        try{
            await client.get(this.endpoint + "/?id="+ {id} + "&password=" + oldPassword ).then( res =>{
                console.log(res)
                let temp = res;
            });
        }
        catch{
            return null;
        }

        let data = {password: newPassword}
        //change password
        let ans = updateIdWithData(id, data)
        console.log(ans)
    }
}