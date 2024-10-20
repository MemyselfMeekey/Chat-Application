import { CasUsers } from "../db.connection.js"


class AuthService{
    registerSave=async(data)=>{
        try{
            const savedUser=new CasUsers(data)
            console.log(savedUser)
            return await savedUser.save()
        }
        catch(err){
            console.log("err",err)
        }
    }
}
export const AuthSvc=new AuthService()