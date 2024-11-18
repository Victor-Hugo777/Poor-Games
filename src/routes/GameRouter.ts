import express from "express";
import { GameController } from "../controller/GameController";

export const gameRouter = express.Router();

const gameController = new GameController();

gameRouter.get("/", gameController.verJogos);
gameRouter.get("/genero", gameController.buscarJogosPorGenero);
gameRouter.post("/", gameController.criarJogo);
gameRouter.put("/:id", gameController.atualizarJogo);
gameRouter.delete("/:id", gameController.deletarJogo);
