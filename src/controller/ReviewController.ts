import {Request,Response} from 'express'
import { ReviewBusiness } from '../business/ReviewBusiness';
import { generateId } from '../middlewares/idGenerator';

export class ReviewController {
  reviewBusiness = new ReviewBusiness()

  verAvaliacoes = async (req: Request, res: Response): Promise<any> => {
    try {

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

        const avaliacoes = await this.reviewBusiness.verAvaliacoes(page,limit);
        return res.json(avaliacoes);
    
      } catch (error : any) {
      console.error('Erro ao buscar avaliações:', error);
      return res.status(500).json({ message: error.message });
    }
  };

  buscarAvaliacaoPorId = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;

      const avaliacao = await this.reviewBusiness.buscarAvaliacaoPorId(id);
      return res.json(avaliacao);
    } catch (error : any) {
      console.error('Erro ao buscar avaliação:', error);
      return res.status(error.status).json({ message: error.message });
    }
  };

  criarAvaliacao = async (req: Request, res: Response): Promise<any> => {
    try {
      const { nota, comentario ,datacriacao} = req.body;

      if (!nota || !comentario || !datacriacao) {
        throw { status: 400, message: "Todos os campos devem ser preenchidos" };
      }

     if(nota <1 || nota > 5){
       throw { status: 400, message: "A nota deve estar entre 1 e 5" };
     }
      

      if(comentario.length < 10){
        throw { status: 400, message: "O comentário deve ter pelo menos 10 caracteres" };
      }

      if(typeof nota !== "number"){
        throw { status: 400, message: "A nota deve ser um número" };
      }

      if(typeof datacriacao !== "string"){
        throw { status: 400, message: "A data deve ser uma string" };
      }

      const idavaliacao = generateId();

      const novaAvaliacao = await this.reviewBusiness.criarAvaliacao(idavaliacao,nota, comentario,datacriacao);
      return res.status(201).json(novaAvaliacao);

    } catch (error : any) {
      console.error('Erro ao criar Avaliação Controller:', error);
      return res.status(500).json({ message: error.message });
    }
  };

  atualizarAvaliacao = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const { nota, comentario,datacriacao } = req.body;

      if (!nota || !comentario || !datacriacao) {
        throw { status: 400, message: "Todos os campos devem ser preenchidos" };
      }

      if(nota < 1 || nota > 5){
        throw { status: 400, message: "A nota deve estar entre 1 e 5" };
      }

      if(comentario.length < 10){
        throw { status: 400, message: "O comentário deve ter pelo menos 10 caracteres" };
      }

      if(typeof nota !== "number"){
        throw { status: 400, message: "A nota deve ser um número" };
      }

      if(typeof datacriacao !== "string"){
        throw { status: 400, message: "A data deve ser uma string" };
      }

      const avaliacaoAtualizada = await this.reviewBusiness.atualizarAvaliacao(id, nota, comentario,datacriacao);
      return res.status(200).json(avaliacaoAtualizada);
    } catch (error : any) {
      console.error('Erro ao atualizar Avaliação Controller:', error);
      return res.status(error.status).json({ message: error.message });
    }
  };

  deletarAvaliacao = async (req: Request, res: Response): Promise<any> => {
    try{
    const { id } = req.params;
    
    const avaliacaoDeletado = await this.reviewBusiness.deletarAvaliacao(id);
    return res.status(200).json({ message: `Avaliação com ID ${id} deletado com sucesso` });
    } catch (error : any) {
        console.error('Erro ao deletar Avaliação Controller:', error);
        return res.status(error.status).json({ message: error.message });
    }
};


}