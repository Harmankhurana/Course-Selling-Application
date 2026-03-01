import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
    firstName: String,
    lastName: String,
});

const adminSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    password: String,
    firstName: String,
    lastName: String,
});


const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "admin"
    },
});


const purchaseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },    
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "course",
    },
});


const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purshaseModel = mongoose.model('purchase', purchaseSchema);

export {
    userModel,
    adminModel,
    courseModel,
    purshaseModel
};