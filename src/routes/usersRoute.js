import express from "express"
import { addUserHandler, getAllUsersHandler, getUserByIdHandler } from "../handlers/usersHandler.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsersHandler)
userRouter.get("/users/:id", getUserByIdHandler)
userRouter.post("/users", addUserHandler)

export default userRouter;