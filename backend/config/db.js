import mongoose from "mongoose";

const conectedDb = async () => {
    try {
        await mongoose.connect(process.env.LOCAL_URL)
    console.log(`The databse is connected ${mongoose.connection.host} Successfully . . . . . `)
    } catch (error) {
        console.log('Databas is Not Connected Error : ',error)
    }
}

export default conectedDb;