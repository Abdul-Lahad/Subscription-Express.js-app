import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../model/user.model.js";

const autherize = async (req, res, next) => {

    try {
        let token;
        

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
            console.log("Token from header:", token);

        }

        if(!token)
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);

        req.user = user;

        next();
        
     }catch (error) {
        res.status(401).json({ 
            message: "Unauthorized",
            error: error.message
        });
        
    }
}

export default autherize;