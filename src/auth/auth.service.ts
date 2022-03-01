import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {}

    signUp() {
        return { msg: 'I have signed up'}
     }
    
    signIn() {
        return { msg: 'I have signed in'}
    }
}
