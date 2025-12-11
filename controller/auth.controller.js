import mongoose from "mongoose"
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js"


export const signup =  async (req, res, next) => {
    //signup logic here
    

    try {
        const { email, password, name } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if(existingUser){
            const error = new Error('User already exists with this email');
            error.statusCode = 409;
            throw error;
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        //createing a new user
        const newUsers = await User.create([{
            name,
            email,
            password: hashedPassword
        }]);

        //generateing a token
        const token = jwt.sign(
            { userId: newUsers[0]._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(`201`).json({
            success: true,
            message: 'User created successfully',
            data:{
                token,
               user: newUsers[0]._id
            }
               
            
        });





        
    } catch (error) {
        console.error(error);
        next(error);
    }

}

export const signin = (req, res, next) => {
    //signin logic here
    
}

export const signout = (req, res, next) => {
    //signout logic here
}