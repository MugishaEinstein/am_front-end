import { User } from "@/types/user";
import axios from "axios";
export class UserService{
    public async createUser(user: User){
        console.log(user);
        
        return await axios.post('http://192.168.0.104:8080/api/user/create',JSON.stringify(user),{
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            withCredentials:false
        });
    }

}