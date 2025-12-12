import { Router } from "express";
import { getAllUsers, getUserById } from "../controller/user.controller.js";
import autherize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", autherize, getUserById);

userRouter.put("/:id", (req, res)=>{
    const {id} = req.params;
    res.send({title: `UPDATE user with id: ${id}`});
})

userRouter.delete("/:id", (req, res)=>{
    const {id} = req.params;
    res.send({title: `DELETE user with id: ${id}`});
})

export default userRouter;
