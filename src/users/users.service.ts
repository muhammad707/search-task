import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async getUsers(
        filterDto: GetUsersFilterDto
    ): Promise<Array<User>> {

        return this.userRepository.getUsers(filterDto)
    }
}
