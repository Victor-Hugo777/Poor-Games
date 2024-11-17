import express from "express";
import { GameController } from "../controller/GameController";

export const gameRouter = express.Router();

const gameController = new GameController();

gameRouter.get("/jogos", gameController.verJogos);
gameRouter.get("/jogos/genero", gameController.buscarJogosPorGenero);
gameRouter.post("/jogos", gameController.criarJogo);
gameRouter.put("/jogos/:id", gameController.atualizarJogo);
gameRouter.delete("/jogos/:id", gameController.deletarJogo);
