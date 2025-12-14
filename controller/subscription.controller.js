import Subscription from "../model/subscription.model.js";


export const getAllSubscriptions = async (req, res, next)=>{

    try {
        const subscriptions = await Subscription.find();

        if(subscriptions.length === 0 ){
            return res.status(404).json({
                success: false,
                message: "No subscriptions found"
            })
        }

        res.status(200).json({
            success: true,
            data: subscriptions
        })

        
    } catch (error) {
        console.log("Get All Subscription :", error);
        next(error);
        
    }

}

export const getSubscriptionById = async (req, res, next)=>{

    try {
        const {id} = req.params;

        const subscription = await Subscription.findById(id);

        if(!subscription){
            return  res.status(404).json({
                success: false,
                message: "Subscription not found"
            })
        }

        res.status(200).json({
            success: true,
            data: subscription
        })

    } catch (error) {
        console.log("Get Subscription By Id Error :", error);
        next(error);
        
    }

}

export const updateSubscriptionById = async (req, res, next)=>{

    try {

        const {id} = req.params;

        const updatedSubscription = await Subscription.findByIdAndUpdate(id,{
            ...req.body
        },
        {new: true},
        {runValidators: true})

        if(!updatedSubscription){
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            })
        }

        res.status(200).json({
            success: true,
            data: updatedSubscription
        })

        
    } catch (error) {
        console.log("Error at update subscripion by Id API : ", error);
        next(error);

        
    }

}

export const deleteSubscriptionById = async (req, res, next) =>{

    try {
        
        const {id} = req.params;

        const deletedSubscription = await Subscription.deleteOne({
            _id: id
        })

        if(!deletedSubscription){
           return res.status(404).json({
                success: false,
                message: "Subscription NOt Found"
            })
        }

        res.status(200).json({
            success: true,
            data: deletedSubscription
        })

        

    } catch (error) {
        console.log("Error at Delete Subscription controller : ", error);
        next(error)
    }
}

export const cancelSubscriptionByUserId = async (req, res, next) => {
    try {
        const {userId} = req.params;
        
        

        if(userId != req.user._id){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to cancel this subscription"
            });
        }


        const canceledSubscription = await Subscription.findOneAndUpdate(
            {userId: userId},
            {status: "inactive"},
            {new: true}
        );

        if(!canceledSubscription){
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            })
        }

        res.status(200).json({
            success: true,
            data: canceledSubscription
        })

    } catch (error) {
        console.log("Error at Cancel Subscription By UserId: ", error);
        next(error);

        
    }
}

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

export const getAllUpcommingRenewals = async (req, res, next) => {
    try{

        const currentDate = new Date();
        const nextWeekDate = new Date(currentDate);
        nextWeekDate.setDate(currentDate.getDate() + 7);

        const upcommingRenwals = await Subscription.find({
            nextRenewalDate: {
                $gte: currentDate,
                $lte: nextWeekDate
            }
        })

        if(upcommingRenwals.length === 0){
            return res.status(404).json({
                success: false,
                message: "No upcoming renewals found"
            })
        }

        res.status(200).json({
            success: true,
            data: upcommingRenwals
        })


    }catch(error){

    }
}