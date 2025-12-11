
const errorMiddleware = (err, req, res, next) => {

    const error = {...err};

    console.error(error);

    //Mangoose bad ObjectId
    if(err.name === 'CastError'){
        const message = 'Resource not found';
        error = new Error(message);
        error.statusCode = 404;

    }

    //Mangoose duplicate key
    if(err.code === 11000){
        const message = "Duplicate field value entered";
        error = new Error(message);
        error.statusCode = 400;
    }

    //Mangoose validation error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new Error(message);
        error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Server Error"
    })

}

export default errorMiddleware;
