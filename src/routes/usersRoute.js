import express from "express"
import { createUserHandler, deleteUserHandler, getAllUsersHandler, getUserByIdHandler, updateUserHandler, } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsersHandler)
userRouter.get("/users/:id", getUserByIdHandler)
userRouter.post("/users", createUserHandler)
userRouter.put("/users/:id", updateUserHandler)
userRouter.delete("/users/:id", deleteUserHandler)


export default userRouter;