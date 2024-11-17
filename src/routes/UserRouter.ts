import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.get("/usuarios", userController.verUsuarios);
userRouter.get("usuarios/:id", userController.buscarUsuarioPorId);
userRouter.post("usuarios", userController.criarUsuario);
userRouter.put("/usuarios/:id", userController.atualizarUsuario);
userRouter.delete("/usuarios/:id", userController.deletarUsuario);
