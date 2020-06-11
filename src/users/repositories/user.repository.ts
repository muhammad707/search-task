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

        // let query1 = `"u"."fullname" ~* $1`
        // let query2 = `"u"."position" ~* $1`
        // let query3 = `"a"."address" ~* $1`
       
        // for(let i = 1; i<arr.length; i++) {
        //     query1 += ` OR "u"."fullname" ~* $${i+1}`;
        //     query1 += ` OR "u"."position" ~* $${i+1}`;
        //     query1 += ` OR "a"."address" ~* $${i+1}`;
        // }
        // for(let i = 1; i<arr.length; i++) {
        //     query2 += ` OR "u"."fullname" ~* $${i+1}`;
        //     query2 += ` OR "u"."position" ~* $${i+1}`;
        //     query2 += ` OR "a"."address" ~* $${i+1}`;
        // }
        // for(let i = 1; i<arr.length; i++) {
        //     query3 += ` OR "u"."fullname" ~* $${i+1}`;
        //     query3 += ` OR "u"."position" ~* $${i+1}`;
        //     query1 += ` OR "a"."address" ~* $${i+1}`;
        // }
        // queryBuilder = queryBuilder + ` (${query1}) AND (${query2}) AND (${query3})`
        // console.log(queryBuilder)
        // const params = [...arr, ...arr, ...arr ] 
        // console.log(params)
        // const result = await connection.query(queryBuilder, arr);
        // console.log(result)

        let query = `("u"."fullname" ~* $1 OR "u"."position" ~* $1 OR "u"."position" ~* $1)`
        for(let i = 1; i<arr.length; i++) {
            query = query + ` AND ("u"."fullname" ~* $${i+1} OR "u"."position" ~* $${i+1} OR "u"."position" ~* $${i+1})`
        }
        queryBuilder = queryBuilder + query
        console.log(queryBuilder) 
        console.log(arr)
        const result = await connection.query(queryBuilder, arr);
        console.log(result)
        try {
            // const users = await query.getMany()
            // console.log(users)
        } catch (error) {
            
        }
        return []
    }
}