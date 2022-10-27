import mongoose, { Document } from "mongoose";
import { IItem } from "./Item";
import { IUser } from "./User";

export interface IProject extends Document {
    name: string;
    items: [IItem["_id"]];
    admin: IUser["_id"];
    description?: string;
}

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    items: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

const Project = mongoose.model<IProject>("Project", schema);

export default Project;