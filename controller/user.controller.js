import User from '../model/user.model.js';


export const getAllUsers = async (req, res, next) =>{

    try {
        const users = await User.find().select('-password');

        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        next(error);
    }    

}

export const getUserById = async (req, res, next) =>{

    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');

        // If user not found, send 404 response
        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: user
        })

    }catch (error) {
        next(error)
    }
}