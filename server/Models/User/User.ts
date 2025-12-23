import mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";

export interface Iuser extends Document {
  fullName: string;
  email: String;
  password : String,
  phone: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<Iuser> = new Schema(
{
  fullName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  phone : {
    type : String,
    required  : true,
    trim : true
  },
  password : {
    type : String,
    required : true,
    trim : true
  },
  isActive : {
    type : Boolean,
    default : true
  }
},
{
    timestamps : true
}
);

const userModel : Model <Iuser> = mongoose.model("users",userSchema)

export default userModel