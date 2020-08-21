import {Request, Response, request} from 'express'
import db from '../database/connection'

class Connection {
    async index(req: Request, res: Response) {
        const TotalConnect = await db('connections').count('* as total')

        const {total} = TotalConnect[0]

        return res.json({total})

    }

    async create(req: Request, res: Response) {
        const {user_id} = req.body
        await db('connections').insert({
            user_id
        })


        return res.status(201).json()
    }
}

export default new  Connection()