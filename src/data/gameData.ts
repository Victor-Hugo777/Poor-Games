import db from "../connection";


export class GameData {
  verJogos = async (page: number, limit: number): Promise<any> => {
    try {
        const offset = (page - 1) * limit;
        const jogos = await db("jogos")
            .select("*")
            .orderBy("idjogo", "asc")
            .limit(limit)
            .offset(offset);
        return jogos;
    } catch (error: any) {
        throw new Error(error.sqlMessage || error.message || error.stack);
    }
}

  buscarJogosPorGenero = async (genero: string): Promise<any> => {
    try {
      const jogos = await db("jogos")
        .select("*")
        .where("genero",genero)
      return jogos;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };

  buscarJogoPorId = async (idJogo : string): Promise<any> =>{
    try{
    const jogo = await db("jogos").where("idjogo" , idJogo).first();
    return jogo;
    }catch(error : any){
      console.log(error)
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  }

  buscarJogoPorNome = async (nomejogo: string): Promise<any> => {
    try {
      const jogo = await db("jogos").where("nomejogo", nomejogo).first();
      return jogo;
    } catch (error :any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };

  criarJogo = async (
    idjogo: string,
    nomejogo: string,
    genero: string,
    datalancamento: string,
    preco: number
  ): Promise<any> => {
    try {
      const [novoJogo] = await db("jogos")
        .insert({
          idjogo,
          nomejogo,
          genero,
          datalancamento,
          preco,
        })
        .returning("*");
      return novoJogo;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };

  atualizarJogo = async (
    id: string,
    nomejogo: string,
    genero: string,
    datalancamento: string,
    preco: number
  ): Promise<any> => {
    try {
      const jogoAtualizado = await db("jogos")
        .where("idjogo", id)
        .update({
          nomejogo,
          genero,
          datalancamento,
          preco,
        })
        .returning("*");
      return jogoAtualizado;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };

  deletarJogo = async (id: string): Promise<void> => {
    try {
      await db("jogos").where("idjogo", id).del();
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };
}