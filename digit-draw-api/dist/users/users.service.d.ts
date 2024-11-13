import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    register(userDto: UserDTO): Promise<User>;
    findOne(username: string): Promise<User | undefined>;
}
