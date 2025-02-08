import jwt from "jsonwebtoken"
import { User } from "../models/userModel"
const SECRET = process.env.JWT_SECRET;
const authAdmin = async (req,res,next)=>{
    if (req.user && req.user.isAdmin){
        next();
    } else{
        return res.status(403).send("Not Authorized As Admin")
    }
}
export default authAdmin