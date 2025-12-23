import mongoose from "mongoose";
import {Schema,Model,Document} from "mongoose"

export interface Iblog extends Document{
    blogTitle : string;
    description : string;
    content : string;
    user_id : mongoose.Types.ObjectId;
    createdAt?:Date;
    updateAt?: Date;
}

const blogSchema:Schema<Iblog> = new mongoose.Schema(
    {
        blogTitle : {
            type : String,
            required : true,
            trim : true
        },
        description:{
            type : String,
            required : true,
            trim : true
        },
        content : {
            type : String,
            required : true,
            trim : true
        },
        user_id : {
            type : Schema.Types.ObjectId,
            required : true
        }
    },
    {
        timestamps : true
    }
)

const blogModel : Model<Iblog> = mongoose.model("blogs",blogSchema)

export default blogModel
