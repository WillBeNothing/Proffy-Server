import express, {Router} from 'express'
import multer from "multer"




import Classescontroller from '../controllers/Classescontroller'
import ConnectionsController from '../controllers/ConnectionsController'
import MulterConfig from '../database/config/multer'
import file from'../controllers/AvatarControllers'
import Users from '../controllers/UsersController'
import Session from '../controllers/SessionController'

import auth from '../middlewares/auth'


const multerSettings = multer(MulterConfig)



const routes = Router() 



routes.post('/register', Users.store)
routes.get('/classes', auth,  Classescontroller.index)
routes.post('/auth', Session.store)




routes.post('/avatar_upload', multerSettings.single('file'), auth, file.Avatarstore)
routes.get('/connections',  ConnectionsController.index)
routes.post('/classes', auth, Classescontroller.store)
routes.post('/connections', ConnectionsController.create)

export default routes