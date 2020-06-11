import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { GetUsersFilterDto } from "../dto/get-users-filter.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async getUsers(
        filterDto: GetUsersFilterDto
    ): Promise<Array<User>> {
        const {search} = filterDto;
        return []
    }
}