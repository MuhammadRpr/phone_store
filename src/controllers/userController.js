import * as UserService from '../services/userService.js';

export const getAllUsersHandler = async (req, res) => {
    try {
        const response = await UserService.getAllUser();

        res.status(200).json({
            status: "success",
            data: response,
        })

    } catch (error) {
        console.error(error);
    }
}

export const getUserByIdHandler = async (req, res) => {

    try {
        const { id } = req.params;
        const response = await UserService.getUserById(id);

        res.status(200).json({
            status: "success",
            data: response,
        })
    } catch (error) {
        console.error(error);
    }
}