import express, {Router} from 'express'
import Classescontroller from '../controllers/Classescontroller'
import ConnectionsController from '../controllers/ConnectionsController'




const routes = Router() 


routes.post('/classes', Classescontroller.store)
routes.get('/classes', Classescontroller.index)
routes.post('/connections', ConnectionsController.create)
routes.get('/connections', ConnectionsController.index)

export default routes