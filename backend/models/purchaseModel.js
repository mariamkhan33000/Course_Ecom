import mongoose from "mongoose";

const purchaseScheme = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        ref: "User"
    },
    courseId: {
        type : mongoose.Types.ObjectId, 
        ret: "Course"
    }
}, 
{
    timestamps: true
})

export const Purchase = mongoose.model("Purchase", purchaseScheme)