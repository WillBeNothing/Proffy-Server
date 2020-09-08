import knex from "../database/connection"

import {Request, Response} from 'express'
import converction from "../utils/convertHourToMinutes"

interface Scheduleitem {
    week_day: number;
    from: string;
    to: string;
}

class ClassesControler {
    async  store(req: any, res: Response) {
        const {name,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
            } = req.body
    
            const trx = await knex.transaction()
    
           try {
               
            const getUser = await knex('users').where('id', req.userid).returning('avatar_url')
            
    
            var created_user = await knex('proffys').insert({
                name: getUser[0].name,
                avatar_url: getUser[0].avatar_url,
                whatsapp,
                bio,
                user_id: getUser[0].id
            }).returning('id')
    
            var user_id = created_user[0]
           
           
    
            const insertedclassesID = await knex('classes').insert({
                subject,
                cost,
                user_id
            }).returning('id')
    
            const class_id = insertedclassesID[0]
    
    
            const class_schedule = schedule.map((item: Scheduleitem) => {
                return {
                    class_id,
                    week_day: item.week_day,
                    from: converction(item.from),
                    to: converction(item.to)
                    
                }
            })
    
            await knex('class_schedule').insert(class_schedule)
    
    
            
            return res.json().status(201)
    
           } catch(err) {

                 
                trx.rollback()
                console.log(err)
               
           }
    
    
    }

    async index(req: Request, res: Response) {
        
        const filter = req.query;

        if(!filter.week_day || !filter.subject || !filter.time){
            return res.status(400).json({error: "MIssing filters to search classes"})
        }
        const week_day = filter.week_day as string;
        const subject = filter.subject as string;
        const time = filter.time as string;
        
        const TimeInMinutes = converction(time)

try{
    const classes = await knex('classes')
	.whereExists(function() {
	  this.select('class_schedule.*')
	    .from('class_schedule')
	    .whereRaw('class_schedule.class_id = classes.id')
	    .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
	    .whereRaw('class_schedule.from <= ??', [TimeInMinutes])
	    .whereRaw('class_schedule.to > ??', [TimeInMinutes])
	})
	.where('classes.subject', '=', subject)
	.join('proffys', 'classes.user_id', '=', 'proffys.id')
	.select(['classes.*', 'proffys.*'])

return res.json(classes)
} catch(err) {
    
    return res.json()
}
       
        

    }
}

export default new ClassesControler()