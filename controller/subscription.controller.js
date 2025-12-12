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

export const getUserSubscriptionById = async (req, res, next)=>{

    try {



        const userId = req.params.id;
        

        if(userId != req.user._id.toString()){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this subscription"
            });
        }

        const subscription = await Subscription.find({userId: userId});

        if(!subscription) res.status(404).json({
            success: false,
            message: "Subscription not found"
        });

        res.status(200).json({
            success: true,
            data: subscription
        })
        
    } catch (error) {
        console.log("get user subscription by id error", error);
        next(error);
    }

}