import { Router } from "express";

const authRouter = Router();

authRouter.post('/login', (req,res) =>{
    res.send({message: "login route"});
})
authRouter.post('/logout', (req,res) =>{
    res.send({message: "logout route"});
})
authRouter.post('/signup', (req,res) =>{
    res.send({message: "signup route"});
})


export default authRouter;