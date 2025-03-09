import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import courseRoute from './routes/courseRoutes.js';
import userRoute from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import connectedDb from './config/db.js'; // Fix spelling
import fileUpload from 'express-fileupload';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4001;

// ✅ CORS Configuration (important for cookies)
app.use(cors({
    origin: "http://localhost:3000", // Adjust to your frontend URL
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// ✅ Correct route paths
app.use('/api/v1/course', courseRoute);
app.use('/api/v1/user', userRoute);

// ✅ Fix Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(PORT, () => {
    console.log(`The Server is running at port ${PORT} successfully . . . .`);
    connectedDb(); // ✅ Fix spelling
});
