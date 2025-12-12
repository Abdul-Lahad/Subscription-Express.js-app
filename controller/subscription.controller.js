import Subscription from "../model/subscription.model.js";


export const createSubscription = async (req, res, next)=>{

    try {
        const newSubscription = await Subscription.create({
            ...req.body,
            userId: req.user._id,
        })

        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: newSubscription
        })
        
    } catch (error) {
        console.log("subscription creation error", error);
        next(error);
    }

}