import mysql from 'mysql2/promise';


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "phone_store_db",
});

export const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database connected successfully");
        connection.release();
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
};