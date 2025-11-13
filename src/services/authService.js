import { pool } from "../config/db.js";
import { registerSchema } from "../validations/authValidation.js";
import validate from "../validations/validate.js";
import bcrypt from "bcrypt"; // 🧂 Tambah import bcrypt

export const register = async (request) => {
    const validated = validate(registerSchema, request);

    const {
        fullname,
        username,
        email,
        password,
        role,
        address,
        phone_number,
        age,
    } = validated;

    // 🔐 Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    const [users] = await pool.query(
        "INSERT INTO users (fullname, username, email, password, role, address, phone_number, age) VALUES (?,?,?,?,?,?,?,?)",
        [
            fullname,
            username,
            email,
            hashedPassword,
            role,
            address,
            phone_number,
            age,
        ]
    );

    // 🧾 Objek data user tanpa password
    const newUser = {
        id: users.insertId,
        fullname,
        username,
        email,
        role,
        address,
        phone_number,
        age,
    };

    return newUser;
};
