import { GameData } from "../data/gameData";

export class GameBusiness {
  gameData = new GameData();

  verJogos = async (): Promise<any> => {
    try {
      const jogos = await this.gameData.verJogos();
      return jogos;
    } catch (error:any) {
      throw new Error(error.message);
    }
  };

  buscarJogosPorGenero = async (genero: string): Promise<any> => {
    if (!genero) {
      throw new Error("Gênero é obrigatório");
    }

    try {
      const jogos = await this.gameData.buscarJogosPorGenero(genero);
      return jogos;
    } catch (error) {
      throw new Error("Erro ao buscar jogos por gênero na camada Business");
    }
  };

  criarJogo = async (
    nomejogo: string,
    genero: string,
    datalancamento: string,
    paginajogo: number,
    preco: number
  ): Promise<any> => {
    if (
      !nomejogo ||
      !genero ||
      !datalancamento ||
      !paginajogo ||
      preco === undefined
    ) {
      throw new Error(
        "Todos os campos (nomejogo, genero, dataLancamento, paginajogo, preco) são obrigatórios"
      );
    }

    try {
      const jogoExistente = await this.gameData.buscarJogoPorNome(nomejogo);
      if (jogoExistente) {
        throw new Error("Jogo já existe no banco de dados");
      }

      return await this.gameData.criarJogo(
        nomejogo,
        genero,
        datalancamento,
        paginajogo,
        preco
      );
    } catch (error) {
      throw new Error("Erro ao criar novo jogo");
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
    if (
      !nomejogo ||
      !genero ||
      !datalancamento ||
      !paginajogo ||
      preco === undefined
    ) {
      throw new Error("Todos os campos são obrigatórios");
    }

    try {
      return await this.gameData.atualizarJogo(
        id,
        nomejogo,
        genero,
        datalancamento,
        paginajogo,
        preco
      );
    } catch (error) {
      throw new Error("Erro ao atualizar o jogo");
    }
  };

  deletarJogo = async (id: string): Promise<void> => {
    try {
      await this.gameData.deletarJogo(id);
    } catch (error) {
      throw new Error("Erro ao deletar jogo");
    }
  };
}
