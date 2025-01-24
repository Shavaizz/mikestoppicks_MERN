import mongoose from "mongoose";
const productSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true,
            default:0
        },
        image:{
            type:String,
            required:false
        }
    },
    {
        timestamps:true
    }
);
export const Product = mongoose.model('Product', productSchema);