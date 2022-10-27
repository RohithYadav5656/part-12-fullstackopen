import mongoose, { Document } from "mongoose";
import { IProject } from "./Project";
import { IUser } from "./User";

export interface IItem extends Document {
    data: string;
    unlockDate: Date;
    project: IProject["_id"];
    admin: IUser["_id"];
}

const schema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    unlockDate: {
        type: Date,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Item = mongoose.model<IItem>("Item", schema);

export default Item;