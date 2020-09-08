
import {Request, Response} from 'express'
import db from '../database/connection';


class Avatar {
    async Avatarstore(req : any, res: Response){
        const {filename: name, path } = req.file;

        try{
            const upload_avatar = await db('avatar').insert({
                avatar_name: name ,
                avatar_path: path,
                avatar_url: `http://localhost:3333/avatar/${name}`
            }).returning('avatar_url')

            var getURL = upload_avatar[0]

            req.avatarurl = getURL

             const user = await db('users').where('id', req.userid).update({avatar_url: getURL})
             



            
            return res.json({getURL})

            
        } catch (err) {
            console.log(err)
        }
        
    } 
}



export default new Avatar();