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

export const updateUserEmailById = async (req, res, next) => {
    try {

        const { _id } = req.user;

        const {id} = req.params;

        if(_id != id){
            return  res.status(403).json({
                success: false,
                message: "You are not authorized to update this user"
            })
        }

        const {email} = req.body;


        const updatedUser = await User.findOneAndUpdate(
            {_id: id},
            {email},
            {new: true}
        )

        if(!updatedUser){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: 'User email updated successfully'
        })
        


    } catch (error) {
        console.log("Error at Update User By ID : ", error);
        next(error);

        
    }
}

export const deleteUserById = async (req, res, next) => {




    try {
        const {id} = req.params;

        const { _id} = req.user;

        if(_id != id){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this user"
            })
        }

        const deletedUser = await User.findOneAndDelete(
            {_id: id}
        );

        if(!deletedUser){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })

    } catch (error) {
        console.log("Error at Delete User By Id: ", error);
        next(error);
        
    }
}