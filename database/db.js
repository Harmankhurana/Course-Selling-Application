import mongoose from "mongoose";
import { string } from "zod";

const Schema = mongoose;

const userSchema = new Schema({
    firstName: string,
    lastName: string,
    email: {
        required: true,
        type: string,
    },
    password: string
});

const adminSchema = new Schema({
    firstName: string,
    lastName: string,
    email: {
        required: true,
        type: string,
    },
    password: string
});

const courseSchema = new Schema({
    title: string,
    description: string,
    price: string,
    imageURL: string,
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: adminId,
    }
});

const purchaseSchema = new Schema({

});

const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('user', adminSchema);
const courseModel = mongoose.model('user', courseSchema);
const purshaseModel = mongoose.model('user', purchaseSchema);

export {
    userModel,
    adminModel,
    courseModel,
    purshaseModel
};