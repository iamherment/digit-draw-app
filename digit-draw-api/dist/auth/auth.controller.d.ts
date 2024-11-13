import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserDTO } from 'src/users/user.dto';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(userDto: UserDTO): Promise<import("../users/user.entity").User>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        accessToken: string;
        userId: any;
    }>;
}
