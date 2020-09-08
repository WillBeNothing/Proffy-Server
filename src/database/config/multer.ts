import multer from 'multer'
import crypto from 'crypto'
import {resolve, extname} from 'path'

const multerConfig = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', '..', 'tmp', 'uploads'),
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, res) => {
                if(err) {
                    const error = err.toString()
                    return cb(null,error)
                }

                return cb(null, res.toString('hex') + extname(file.originalname))
            })
        }
    }),

    limits: {
        fileSize: 2 * 1024 * 1024
    },

    fileFilter: (req: any, file: any, cb: any) => {
        const allowedTypes =[
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/jpg',
            
        ]

        if(allowedTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Invalid file type'))
        }
    }

}

export default multerConfig