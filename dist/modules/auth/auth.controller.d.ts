import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    register(dto: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../users/entities/user.entity").UserRole;
    }>;
    login(body: LoginDto): Promise<{
        access_token: string;
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map