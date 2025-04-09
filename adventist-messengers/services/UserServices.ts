import { User } from "@/types/user";
import axios from "axios";
export class UserService{
    public async createUser(user: User){
        console.log(user);
        
        return await axios.post('http://10.0.134.197:8080/api/user/create',JSON.stringify(user),{
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            withCredentials:false
        });
    }
    public async getUser(){
        return await axios.get('http://192.168.43.150:8080/',{withCredentials:false});
    }
}