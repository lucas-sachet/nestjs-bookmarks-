import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthInterface } from './interface';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }
    login() { }

    async signUp(dto: AuthInterface) {
        try {
            //generate password
            const hash = await argon.hash(dto.password);
            //save the new user in the db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            });
            delete user.hash;
            //return the saved user
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
                throw error;
            }
        }
    }

    async signIn(dto: AuthInterface) {
        //find user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })
        if (!user) throw new ForbiddenException('Credentials incorrect')
        
        //compare password
        const pwMatches = await argon.verify(user.hash, dto.password)
        if(!pwMatches) throw new ForbiddenException('Credentials incorrect')
        
        delete user.hash;
        return user;
    }
}
