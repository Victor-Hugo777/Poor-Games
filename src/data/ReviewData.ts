import db from "../connection";

export class ReviewData {
  verAvaliacoes = async (page: number, limit: number): Promise<any> => {
    try {
      const offset = (page - 1) * limit;
      const avaliacoes = await db("avaliacoes")
        .select("*")
        .orderBy("idavaliacao", "asc")
        .limit(limit)
        .offset(offset);
      
        return avaliacoes;
    
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };
  buscarAvaliacaoPorId = async (id: string): Promise<any> => {
    try {
      const avaliacao = await db("avaliacoes").where("idavaliacao", id).first();
      return avaliacao;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };



  criarAvaliacao = async (
    idavaliacao: string,
    nota: number,
    comentario: string,
    datacriacao: string
  ): Promise<any> => {
    try {
      const [novaAvaliacao] = await db("avaliacoes")
        .insert({
          idavaliacao,
          nota,
          comentario,
          datacriacao,
        })
        .returning("*");
      return novaAvaliacao;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };

  atualizarAvaliacao = async (
    id: string,
    nota: number,
    comentario: string,
    datacriacao: string
  ): Promise<any> => {
    try {
      const [avaliacaoAtualizada] = await db("avaliacoes")
        .where("idavaliacao", id)
        .update({
          nota,
          comentario,
          datacriacao,
        })
        .returning("*");
      return avaliacaoAtualizada;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };

  deletarAvaliacao = async (id: string): Promise<any> => {
    try {

      const avaliacaoDeletada = await db("avaliacoes").where("idavaliacao", id).del();
      return avaliacaoDeletada;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };
}


