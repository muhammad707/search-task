import { EntityRepository, Repository, getConnection } from "typeorm";
import { User } from "../entities/user.entity";
import { GetUsersFilterDto } from "../dto/get-users-filter.dto";
import { Address } from "../entities/address.entity";
import { query } from "express";

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
        }

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

        let query1 = `"u"."fullname" ~* $1`
        let query2 = `"u"."position" ~* $2`
        let query3 = `"a"."address" ~* $3`
       
        for(let i = 1; i<arr.length; i++) {
            query1 += ` AND "u"."fullname" ~* $${i*3+1}`;
            query2 += ` AND "u"."position" ~* $${i*3+2}`;
            query3 += ` AND "a"."address" ~* $${i*3+3}`;
        }
        queryBuilder = queryBuilder + ` (${query1}) OR (${query2}) OR (${query3})`
        console.log(queryBuilder)
        const params = [...arr, ...arr, ...arr ] 
        console.log(params)
        const result = await connection.query(queryBuilder, params);
        console.log(result)
        try {
            // const users = await query.getMany()
            // console.log(users)
        } catch (error) {
            
        }
        return []
    }
}