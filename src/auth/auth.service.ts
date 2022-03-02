import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthInterface } from './interface';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
  login() {}

    async signUp(dto: AuthInterface) {
        //generate password
        const hash = await argon.hash(dto.password)
        //save the new user in the db
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash
            },
        })
        delete user.hash;
        //return the saved user
        return user
     }
    
    signIn() {
        return { msg: 'I have signed in'}
    }
}
