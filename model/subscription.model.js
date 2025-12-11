import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: [3, "Subscription name must be at least 3 characters long"],
        maxLength: [50, "Subscription name must be at most 50 characters long"]
    },
    price:{
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Subscription price must be at least 0"]
    },
    currency:{
        type: String,
        required: [true, "Currency is required"],
        trim: true,
        enum: ["USD", "EUR", "GBP", "PKR", "JPY"],
        default: "USD"
    },
    frequency:{
        type: String,
        required: [true, "Subscription frequency is required"],
        trim: true,
        enum: ["monthly", "yearly", "weekly"],

    },
    category:{
        type: String,
        required: [true, "Subscription category is required"],
        trim: true,
        enum: ["entertainment", "education", "productivity", "health", "other"],
    },
    paymentMethod:{
        type: String,
        required: [true, "Payment method is required"],
        trim: true,
    },
    status:{
        type: String,
        required: [true, "Subscription status is required"],
        trim: true,
        enum: ["active", "canceled", "expired"],
        default: "active"
    },
    startDate:{
        type: Date,
        required: [true, "Start date is required"],
        default: Date.now,
        validate:{
            validator: function(value){
                return value <= new Date();
            },
            message: "Start date cannot be in the future"
        }
    },
    renewalDate:{
        type: Date,
        validate: {
            validator: function(value){
                return value > this.startDate;
            },
            message: "Renewal date must be after the date of start"
        }
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
        index: true
    }
},{
    timestamps: true
})

subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriod = {
            dailay:1,
            weekly:7,
            monthly:30,
            yearly:365
        }
        this.renewalDate = new Date(this.startDate.getDate())
        this.renewalDate.setDate(this.startDate.getDate() + renewalPeriod[this.frequency]);
    }

    if(this.renewalDate <= this.startDate){
        this.status = "expired";
    }


    next();)


const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;