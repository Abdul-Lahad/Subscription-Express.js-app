import { Router } from "express";
import { getAllUsers,
        getUserById, 
        updateUserEmailById,
        deleteUserById } from "../controller/user.controller.js";
import autherize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", autherize, getUserById);

userRouter.put("/:id", autherize, updateUserEmailById);

userRouter.delete("/:id", autherize, deleteUserById);



export default userRouter;
