import mongoose, { mongo } from "mongoose";
const userSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        userisadmin:{
            type:Boolean,
            required:true
        },
        usernick:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
);
export const User = mongoose.model('User', userSchema);