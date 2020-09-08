import db from '../database/connection'
import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import auth from '../../auth'
import 'dotenv/config'
class Session {
    async store(req: Request, res: Response) {
       
        const {email, password} = req.body

        const verifyEmail = await db('users').where('email', email).returning('password_hash')



        const StringVerifyEmail = JSON.stringify(verifyEmail)

        if( StringVerifyEmail === "[]") {
            return res.status(401).json( { error: 'The Users does not exists'})
        }

        const checkPassword = await bcrypt.compare(password, verifyEmail[0].password_hash)

        if(! checkPassword) {
            return res.status(401).json({ error : 'The password does not match'})
        }

        const user_id = await verifyEmail[0].user_id

        const token = jwt.sign({user_id}, auth.secret , {
            expiresIn: process.env.AUTH_EXPIRESIN
        })

        return res.json(token)

    }
}

export default new Session();