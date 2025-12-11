import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res)=>{
    res.send({title: "GET all users"});
})

userRouter.get("/:id", (req, res)=>{
    const {id} = req.params;
    res.send({title: `GET user with id: ${id}`});
})

userRouter.put("/:id", (req, res)=>{
    const {id} = req.params;
    res.send({title: `UPDATE user with id: ${id}`});
})

userRouter.delete("/:id", (req, res)=>{
    const {id} = req.params;
    res.send({title: `DELETE user with id: ${id}`});
})

export default userRouter;
