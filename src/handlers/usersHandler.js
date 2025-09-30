// dapat data user

import { pool } from "../config/db.js";

export const getAllUsersHandler = async (req, res) => {

    try {
        const [users] = await pool.query("SELECT id, fullname, username, email, role, address, phone_number, age, created_at, updated_at FROM users");

        res.status(200).json({
            status: "success",
            data: users,
        });
    } catch (error) {
        console.error(error)
        throw error;
    }
};

export const getUserByIdHandler = async (req, res) => {

    const { id } = req.params;
    try {
        const [users] = await pool.query("SELECT fullname, username, email, role, address, phone_number, age, created_at, updated_at FROM users WHERE id=?", [id]);

        if (users.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "User not Found"

            })
        }

        res.status(200).json({
            status: "success",
            data: users[0],
        });

    } catch (error) {
        console.error(error);
        throw error;
    }

};

export const addUserHandler = async (req, res) => {

    const { fullname, username, email, password, role } = req.body;

    if (!fullname || !fullname.trim()) {
        return res.status(400).json({
            status: "fail",
            message: "fullname is required"
        })
    }

    if (!username || !username.trim()) {
        return res.status(400).json({
            status: "fail",
            message: "username is required"
        })
    }

    if (username.includes(" ")) {
        return res.status(400).json({
            status: 'fail',
            message: "not space"
        })
    }

    if (!email || !email.trim()) {
        return res.status(400).json({
            status: "fail",
            message: "email is required"
        })
    }
    if (!password || !password.trim()) {
        return res.status(400).json({
            status: "fail",
            message: "password is required"
        })
    }
    if (!role || !role.trim()) {
        return res.status(400).json({
            status: "fail",
            message: "role is required"
        })
    }


    try {
        const [users] = await pool.query("INSERT INTO users (fullname, username, email, password, role) VALUES (?,?,?,?,?)",
            [fullname, username, email, password, role]
        );

        const newUser = {
            id: users.insertId,
            fullname,
            username,
            email,
            role,

        };

        res.status(201).json({
            status: "success",
            message: "user created successfully",
            data: newUser,
        });

    } catch (error) {
        console.error(error)
    }



}