import express from "express";
import { ReviewController } from "../controller/ReviewController";

export const reviewRouter = express.Router();

const reviewController = new ReviewController();

reviewRouter.get("/", reviewController.verAvaliacoes);
reviewRouter.get("/:id", reviewController.buscarAvaliacaoPorId);
reviewRouter.post("/", reviewController.criarAvaliacao)
reviewRouter.put("/:id", reviewController.atualizarAvaliacao)
reviewRouter.delete("/:id", reviewController.deletarAvaliacao)