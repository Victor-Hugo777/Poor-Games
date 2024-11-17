import { Request, Response } from 'express'
import { GameBusiness } from '../business/GameBusiness';

export class GameController {
    gameBusiness = new GameBusiness();

    verJogos = async (req: Request, res: Response): Promise<any> => {
        try {
            const jogos = await this.gameBusiness.verJogos();
            return res.json(jogos);
        } catch (error) {
            console.error('Erro ao buscar jogos:', error);
            return res.status(500).json({ message: 'Erro ao buscar jogos' });
        }
    }

    buscarJogosPorGenero = async (req: Request, res: Response): Promise<any> => {
        const { genero } = req.query;

        if (!genero) {
            return res.status(400).json({ message: "Gênero é obrigatório" });
        }

        try {
            const jogos = await this.gameBusiness.buscarJogosPorGenero(String(genero));
            if (jogos.length === 0) {
                return res.status(404).json({ message: `Nenhum jogo encontrado para o gênero: ${genero}` });
            }
            return res.json(jogos);
        } catch (error) {
            console.error('Erro ao buscar jogos por gênero:', error);
            return res.status(500).json({ message: 'Erro ao buscar jogos por gênero' });
        }
    }

    criarJogo = async (req: Request, res: Response): Promise<any> => {
        const { nomejogo, genero, datalancamento, paginajogo, preco } = req.body;

        try {
            const novoJogo = await this.gameBusiness.criarJogo(nomejogo, genero, datalancamento, paginajogo, preco);
            return res.status(201).json(novoJogo);
        } catch (error) {
            console.error('Erro ao criar novo jogo:', error);
            return res.status(500).json({ message: 'Erro ao criar novo jogo' });
        }
    }

    atualizarJogo = async (req: Request, res: Response): Promise<any> => {
        const { id } = req.params;
        const { nomejogo, genero, datalancamento, paginajogo, preco } = req.body;

        try {
            const jogoAtualizado = await this.gameBusiness.atualizarJogo(id, nomejogo, genero, datalancamento, paginajogo, preco);
            return res.status(200).json(jogoAtualizado);
        } catch (error) {
            console.error('Erro ao atualizar o jogo:', error);
            return res.status(500).json({ message: 'Erro ao atualizar o jogo' });
        }
    }

    deletarJogo = async (req: Request, res: Response): Promise<any> => {
        const { id } = req.params;

        try {
            await this.gameBusiness.deletarJogo(id);
            return res.status(200).json({ message: `Jogo com ID ${id} deletado com sucesso` });
        } catch (error) {
            console.error('Erro ao deletar jogo:', error);
            return res.status(500).json({ message: 'Erro ao deletar jogo' })
        }
    }
}