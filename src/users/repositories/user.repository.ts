import { EntityRepository, Repository, getConnection } from "typeorm";
import { User } from "../entities/user.entity";
import { GetUsersFilterDto } from "../dto/get-users-filter.dto";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async getUsers(
        filterDto: GetUsersFilterDto
    ): Promise<Array<User>> {

        const connection = getConnection();

        const {search} = filterDto;
        let arr = []
        if(search) {
            arr = search.split(" ");
        

            let queryBuilder = `
            SELECT
                distinct("u"."id"), "u"."fullname", "u"."position", "a"."address"
            FROM 
                "user" "u" 
            LEFT JOIN
                "address" "a"
            ON 
                "u"."id" = "a"."userId" 
            WHERE 
            `

            let query = `("u"."fullname" ~* $1 OR "u"."position" ~* $1 OR "u"."position" ~* $1)`
            for(let i = 1; i<arr.length; i++) {
                query = query + ` AND ("u"."fullname" ~* $${i+1} OR "u"."position" ~* $${i+1} OR "u"."position" ~* $${i+1})`
            }
            queryBuilder = queryBuilder + query
            
            try {
                const result = await connection.query(queryBuilder, arr);
                return result
            } catch (error) {
                console.log(error)
                throw new InternalServerErrorException();
            }
        } else {
            const queryBuilder = `
            SELECT
                distinct("u"."id"), "u"."fullname", "u"."position", "a"."address"
            FROM 
                "user" "u" 
            LEFT JOIN
                "address" "a"
            ON 
                "u"."id" = "a"."userId" 
            `
            
            try {
                const result = await connection.query(queryBuilder, arr);
                return result
            } catch (error) {
                console.log(error)
                throw new InternalServerErrorException();
            }
        }
    }
    
}