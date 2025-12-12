import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createSubscription } from "../controller/subscription.controller.js";


const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res)=>{
    res.send({title: "GET all subscriptions"});
})

subscriptionRouter.get("/:id", (req, res)=>{
    const {id} = req.params;
    res.send({title: `GET subscription with id: ${id}`});
})

subscriptionRouter.post('/',authorize , createSubscription);

subscriptionRouter.put("/:id", (req, res)=>{
    const {id} = req.params;
    res.send({title: `UPDATE subscription with id: ${id}`});
})

subscriptionRouter.delete("/:id", (req, res)=>{
    const {id} = req.params;
    res.send({title: `DELETE subscription with id: ${id}`});
})

subscriptionRouter.get("/user/:userId", (req, res)=>{
    const {userId} = req.params;
    res.send({title: `GET subscriptions for user with id: ${userId}`});
})

subscriptionRouter.put("/user/:userId/cancel", (req, res)=>{
    const {userId} = req.params;
    res.send({title: `CANCEL subscription for user with id: ${userId}`});
})

subscriptionRouter.get('/upcoming-renewals', (req, res)=>{
    res.send({title: "GET all upcoming subscription renewals"});
})

export default subscriptionRouter;