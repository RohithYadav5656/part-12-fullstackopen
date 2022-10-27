import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    passwordHash: string;
}

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
        select: false
    }
})

const User = mongoose.model<IUser>("User", schema);

export default User;