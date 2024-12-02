import { ReviewData } from "../data/reviewData";

export class ReviewBusiness {
  reviewData = new ReviewData();

  verAvaliacoes = async (page: number, limit: number): Promise<any> => {
    try {
      const avaliacoes = await this.reviewData.verAvaliacoes(page,limit);
      return avaliacoes;
    
    } catch (error: any) {
      throw { status: 500, message: "Erro ao buscar avaliações" };
    }
  };

  buscarAvaliacaoPorId = async (id: string): Promise<any> => {
    try { 
      const avaliacao = await this.reviewData.buscarAvaliacaoPorId(id);
      if (avaliacao === undefined) {
        throw {
          status: 404,
          message: "A Avaliação inserida não existe ou não foi encontrada",
        };
      }
      return avaliacao;
    } catch (error: any) {
      throw { status: error.status, message: error.message };
    }
  };

  criarAvaliacao = async (
    idavaliacao: string,
    nota: number,
    comentario: string,
    datacriacao: string
  ): Promise<any> => {
    try {

       return await this.reviewData.criarAvaliacao(
        idavaliacao,
        nota,
        comentario,
        datacriacao
      );
    } catch (error: any) {
      console.error("Erro ao criar Avaliação Business: ", error);
      throw { status: 500, message: "Erro ao criar Avaliação Business:" };
    }
  };

  atualizarAvaliacao = async (
    idavaliacao: string,
    nota: number,
    comentario: string,
    datacriacao: string
  ): Promise<any> => {
    try {
      const avaliacaoExistente = await this.reviewData.buscarAvaliacaoPorId(idavaliacao);
      if (!avaliacaoExistente) {
        throw { status : 404 , message:"A Avaliacão que você quer atualizar não existe"};
      }
      return await this.reviewData.atualizarAvaliacao(
        idavaliacao,
        nota,
        comentario,
        datacriacao
      );
    } catch (error : any) {
      console.error('Erro ao atualizar Avaliação Business:', error);
      throw {status : error.status , message: error.message}
    }
  };

  deletarAvaliacao = async (idavaliacao : string): Promise<any> => {
    try {
      const avaliacaoExistente = await this.reviewData.buscarAvaliacaoPorId(idavaliacao);
      if (avaliacaoExistente == undefined) {
        throw { status : 404 , message:"A Avaliacão que você quer deletar não existe"};
      }
      return await this.reviewData.deletarAvaliacao(idavaliacao);
    } catch (error : any) {
      console.error('Erro ao deletar Avaliação Business:', error);
      throw {status : error.status , message: error.message}
    }
  };

  

}
