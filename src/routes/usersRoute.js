import express from "express"
import { createUserHandler, getAllUsersHandler, getUserByIdHandler, } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsersHandler)
userRouter.get("/users/:id", getUserByIdHandler)
userRouter.post("/users", createUserHandler)


export default userRouter;