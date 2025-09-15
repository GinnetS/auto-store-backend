import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private users;
    private jwt;
    constructor(users: UsersService, jwt: JwtService);
    register(dto: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../users/entities/user.entity").UserRole;
    }>;
    validateUser(email: string, password: string): Promise<import("../users/entities/user.entity").User>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map