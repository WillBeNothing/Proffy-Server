import db from '../database/connection'
import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import auth_secret from '../../auth'
import 'dotenv/config'



class UsersController{
    async store(req: Request, res: Response) {
        const {name, email, password} = req.body
        

        
     

        const verifyEmail: Object[] =  await db('users').whereExists(function() {
            this.select('*')
            .from('users')
            .whereRaw('users.email = ?', [email])
        })

       

        const StringVerifyEmail = JSON.stringify(verifyEmail)


        if( StringVerifyEmail !== "[]") {
            const JSONVerifyEmail = JSON.parse(StringVerifyEmail)
            return res.json({ERROR: "The user already exits", user: JSONVerifyEmail})
        }

        const password_hash =  await bcrypt.hash(password, 8)

        const register = await db('users').insert({
            name,
            email,
            password_hash
        }).returning('id')

        

        
        const auth_expiresin = process.env.AUTH_EXPIRESIN?.toString()
        
        const user_id = register[0]

        const token = jwt.sign({user_id}, auth_secret.secret , {
            expiresIn: auth_expiresin
        })

        res.json({token})

        



    }
}

export default new UsersController()