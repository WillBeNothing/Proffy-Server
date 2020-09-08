import util from 'util'
import jwt from 'jsonwebtoken'
import auth from '../../auth'
import {NextFunction, Response, Request} from 'express'

export default async (req: any, res: Response, next: any) => {

    const authHeader = req.headers.authorization;

 

    if(!authHeader) {
        return res.status(401).json({ error: "Does not exist a Token"})
    }
        const [, token ] = authHeader.split(' ')

        c
    try {
        const decoded: any = await util.promisify(jwt.verify)(token, auth.secret)
         req.userid = decoded.user_id
         return next()

    } catch(err) {
        return res.status(401).json({error: 'invalid Token'})

    }
    



}