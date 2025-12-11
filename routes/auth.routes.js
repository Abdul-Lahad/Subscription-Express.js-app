import { Router } from "express";

import { signin, signout, signup } from "../controller/auth.controller.js";
  

const authRouter = Router();

//path: /api/v1/auth
authRouter.post('/sign-up', signup)
authRouter.post('/sign-in', signin)
authRouter.post('/sign-out', signout)

export default authRouter;