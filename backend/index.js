import express from 'express'
import dotenv from 'dotenv'
import courseRoute from './routes/courseRoutes.js'
import { v2 as cloudinary } from 'cloudinary';
import conectedDb from './config/db.js'
import fileUpload from 'express-fileupload';
dotenv.config()
const app = express()


const PORT = process.env.PORT || 4001
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use('/api/v1/course', courseRoute)

// Configuration of Cloudinary

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret
});

app.listen(PORT, () => {
    console.log(`The Server is runing at this ${PORT} Successfully . . . . `)
    conectedDb()
})