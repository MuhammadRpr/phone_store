import * as UserService from '../services/userService.js';

export const getAllUsersHandler = async (req, res, next) => {
    try {
        const response = await UserService.getAllUser();

        res.status(200).json({
            status: "success",
            data: response,
        })

    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const getUserByIdHandler = async (req, res, next) => {

    try {
        const { id } = req.params;
        const response = await UserService.getUserById(id);

        res.status(200).json({
            status: "success",
            data: response,
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const createUserHandler = async (req, res, next) => {
    try {

        const response = await UserService.createUser(req.body);

        res.status(201).json({
            status: "success",
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

export const updateUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const response = await UserService.updateUser(id, updateData);

        res.status(200).json({
            status: "success",
            message: "User berhasil diperbarui",
            data: response,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "error",
            message: error.message || "Gagal memperbarui user",
        });
    }
};

export const deleteUserHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await UserService.deleteUser(id);

        res.status(200).json({
            status: "success",
            message: "User berhasil dihapus",
            data: response,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "error",
            message: error.message || "Gagal menghapus user",
        });
    }
};
