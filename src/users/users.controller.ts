import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    
    constructor(
        private userService: UsersService
    ) {}

    @Get()
    getUsers(
        @Query(ValidationPipe) filterDto: GetUsersFilterDto
    ): Promise<Array<User>> {
        return this.userService.getUsers(filterDto)
    }
}
