import { GameData } from "../data/gameData";

export class GameBusiness {
  gameData = new GameData();

  verJogos = async (page : number,limit : number): Promise<any> => {
    try {
      const jogos = await this.gameData.verJogos(page,limit);
      return jogos;
    } catch (error:any) {
      throw {status : 500, message: "Erro ao buscar jogos"}
    }
  };

  buscarJogosPorGenero = async (genero: string): Promise<any> => {
    try{
   
      const jogos = await this.gameData.buscarJogosPorGenero(genero);
      return jogos;
    } catch (error) {
      throw {status : 500 , message:"Erro ao buscar jogos por gênero na camada Business"};
    }
  };

  criarJogo = async (
    idjogo : string,
    nomejogo: string,
    genero: string,
    datalancamento: string,
    preco: number
  ): Promise<any> => {
    try{
    
      const jogoExistente = await this.gameData.buscarJogoPorNome(nomejogo);
      if (jogoExistente) {
        throw { status : 409 , message: `O jogo ${nomejogo} ja existe`};
      }

      return await this.gameData.criarJogo(
        idjogo,
        nomejogo,
        genero,
        datalancamento,
        preco
      );
    } catch (error : any) {
      console.error('Erro ao criar jogo: ', error);
      throw {status : error.status , message: error.message}
    }
  };

  atualizarJogo = async (
    id: string,
    nomejogo: string,
    genero: string,
    datalancamento: string,
    preco: number
  ): Promise<any> => {
    try{

      const jogoExistente = await this.gameData.buscarJogoPorNome(nomejogo);
      if (jogoExistente) {
        throw { status : 409 , message: `O jogo ${nomejogo} ja existe`};
      }

      const jogoExistenteId = await this.gameData.buscarJogoPorId(id);
      if (jogoExistenteId == undefined) {
        throw { status : 400 , message: "O Jogo que você quer atualizar não existe" };
      }
      return await this.gameData.atualizarJogo(
        id,
        nomejogo,
        genero,
        datalancamento,
        preco
      );
    } catch (error : any) {
      console.error('Erro ao atualizar jogo: ', error);
      throw {status : error.status , message: error.message}
    }
  };

  deletarJogo = async (id: string): Promise<void> => {
    try {
      const idExistente = await this.gameData.buscarJogoPorId(id)
      if(idExistente == undefined){
        throw {status : 400 , message: "O Jogo que vocé quer deletar não existe"}
      }
      await this.gameData.deletarJogo(id);
    } catch (error : any) {
      throw {status : 500, message: error.message};
    }
  };
}