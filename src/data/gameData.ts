import db from "../connection";

export class GameData {
  verJogos = async (): Promise<any> => {
    try {
      const jogos = await db("jogos").select("*").orderBy("idjogo", "asc");
      console.log("camada data")

      return jogos;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };

  buscarJogosPorGenero = async (genero: string): Promise<any> => {
    try {
      const jogos = await db("jogos")
        .select("*")
        .where("genero", "like", `%${genero}%`);
      return jogos;
    } catch (error: any) {
      throw new Error(error.message || error.stack);
    }
  };

  buscarJogoPorNome = async (nomejogo: string): Promise<any> => {
    try {
      const jogo = await db("jogos").where("nomejogo", nomejogo).first();
      return jogo;
    } catch (error) {
      throw new Error("Erro ao buscar jogo por nome");
    }
  };

  criarJogo = async (
    nomejogo: string,
    genero: string,
    datalancamento: string,
    paginajogo: number,
    preco: number
  ): Promise<any> => {
    try {
      const [novoJogo] = await db("jogos")
        .insert({
          nomejogo,
          genero,
          datalancamento,
          paginajogo,
          preco,
        })
        .returning("*");
      return novoJogo;
    } catch (error: any) {
      throw new Error(error.message || error.stack);
    }
  };

  atualizarJogo = async (
    id: string,
    nomejogo: string,
    genero: string,
    datalancamento: string,
    paginajogo: number,
    preco: number
  ): Promise<any> => {
    try {
      const jogoAtualizado = await db("jogos")
        .where("idjogo", id)
        .update({
          nomejogo,
          genero,
          datalancamento,
          paginajogo,
          preco,
        })
        .returning("*");
      return jogoAtualizado;
    } catch (error: any) {
      throw new Error(error.message || error.stack);
    }
  };

  deletarJogo = async (id: string): Promise<void> => {
    try {
      await db("jogos").where("idjogo", id).del();
    } catch (error: any) {
      throw new Error(error.message || error.stack);
    }
  };
}
