import {
CanActivate,
ExecutionContext,
Injectable,
UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { PrismaService } from 'src/prisma.service'
import { IdOrEmail } from 'src/utils/id_or_email'
    
@Injectable()
export class AdminGuard implements CanActivate {
    
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
    
        const req = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(req) 

        if (!token) 
            throw new UnauthorizedException()
        
        try {
            
            const user = await this.prisma.users.findUnique({
                where: IdOrEmail( req.body.id, req.body.email, { 
                    deletedAt : null 
                })
            })

            if( user.role !== 'admin' )
                throw new UnauthorizedException()

        } 
        
        catch ( error ){
            console.log( error )
            throw new UnauthorizedException()
        }

        return true
    
    }

    private extractTokenFromHeader(req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }

}
    