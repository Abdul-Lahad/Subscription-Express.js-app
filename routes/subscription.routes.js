import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createSubscription,
        getUserSubscriptionById, 
        getAllSubscriptions,
        getSubscriptionById,
        updateSubscriptionById,
        deleteSubscriptionById,
        cancelSubscriptionByUserId,
        getAllUpcommingRenewals
    } from "../controller/subscription.controller.js";



const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getAllSubscriptions)

subscriptionRouter.get("/:id", authorize, getSubscriptionById)

subscriptionRouter.post('/',authorize , createSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscriptionById);

subscriptionRouter.delete("/:id", authorize, deleteSubscriptionById);

subscriptionRouter.get("/user/:id", getUserSubscriptionById)

subscriptionRouter.put("/user/:userId/cancel", authorize, cancelSubscriptionByUserId)

subscriptionRouter.get('/upcoming-renewals', authorize, getAllUpcommingRenewals)

export default subscriptionRouter;