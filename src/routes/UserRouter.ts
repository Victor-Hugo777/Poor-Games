import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.get("/", userController.verUsuarios);
userRouter.get("/:id", userController.buscarUsuarioPorId);
userRouter.post("/", userController.cadastrarUsuario);
userRouter.put("/:id", userController.atualizarUsuario);
userRouter.delete("/:id", userController.deletarUsuario);
