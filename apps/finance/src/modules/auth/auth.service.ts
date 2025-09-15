import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    signin(){
        return {msg : " Sign in sucessfully"}
    }
    signup(){
        return {msg : " Sign up sucessfully"}
    }

   
}
