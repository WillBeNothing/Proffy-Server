import express from 'express'
import {resolve} from 'path'
import cors from 'cors' 
import routes from './routes'

const app = express()

app.use(cors())
app.listen(3333)
app.use(express.json())
app.use(routes)

app.use('/avatar', express.static(resolve(__dirname, '..', '..', 'tmp', 'uploads')))


