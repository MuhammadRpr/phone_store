import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import { createUserSchema, updateUserSchema } from "../validations/userValidation.js";
import validate from "../validations/validate.js";

export const getAllUser = async () => {
    const [users] = await pool.query("SELECT id, fullname, username, email, role, address, phone_number, age, created_at, updated_at FROM users"
    );

    return users;
}

export const getUserById = async (id) => {
    const [users] = await pool.query(
        "SELECT fullname, username, email, role, address, phone_number, age FROM users WHERE id=?",
        [id]
    );

    if (users.length === 0) {
        throw new ResponseError(404, "User not found");
    }
    return users;
}

export const createUser = async (request) => {

    const validated = validate(createUserSchema, request);

    const { fullname, username, email, password, role } = validated;

    const [users] = await pool.query(
        "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
        [fullname, username, email, password, role]
    );

    const newUser =
        { id: users.insertId, fullname, username, email, role };
    return newUser;
}
export const updateUser = async (id, request) => {
    const userId = Number(id);


    const validated = validate(updateUserSchema, request);

    const { fullname, username, email, role, address, phone_number, age } = validated;

    const [result] = await pool.query(
        `UPDATE users 
         SET fullname=?, username=?, email=?, role=?, address=?, phone_number=?, age=? 
         WHERE id=?`,
        [fullname, username, email, role, address, phone_number, age, userId]
    );


    if (result.affectedRows === 0) {
        throw new ResponseError(400, "Tidak ada perubahan pada data user");
    }


    const [updatedUser] = await pool.query(
        `SELECT id, fullname, username, email, role, address, phone_number, age 
         FROM users 
         WHERE id=?`,
        [userId]
    );

    return updatedUser[0];
};


export const deleteUser = async (id) => {
    const userId = Number(id);

    const [result] = await pool.query("DELETE FROM users WHERE id=?", [userId]);

    if (result.affectedRows === 0) {
        throw new ResponseError(404, "User not found");
    }

    return { message: "User deleted successfully" };
};

