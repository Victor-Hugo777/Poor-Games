import { Request, Response } from 'express'
import { GameBusiness } from '../business/GameBusiness';
import { generateId } from '../middlewares/idGenerator';

export class GameController {
    gameBusiness = new GameBusiness();

    verJogos = async (req: Request, res: Response): Promise<any> => {
        try {
            
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 5;
            
            const jogos = await this.gameBusiness.verJogos(page,limit);
            return res.json(jogos);
        } catch (error) {
            console.error('Erro ao buscar jogos:', error);
            return res.status(500).json({ message: 'Erro ao buscar jogos' });
        }
    }

    buscarJogosPorGenero = async (req: Request, res: Response): Promise<any> => {
        try{
        const { genero } = req.query;

        if (!genero) {
            return res.status(400).json({ message: "Gênero é obrigatório" });
        }

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
        try{
        const { nomejogo, genero, datalancamento, preco } = req.body;

        if(!nomejogo || !genero || !datalancamento ||!preco){
            return res.status(400).json({message: "Todos os campos devem ser preenchidos"})
        }

        if(typeof nomejogo !== "string" || typeof genero !== "string" || typeof datalancamento !== "string"){ 
            return res.status(400).json({message: "nomejogo , genero e datalancamento devem ser Strings"})
        }

        if(typeof preco !== "number"){
            return res.status(400).json({message: "preco deve ser um número"})
        }

        const idjogo = generateId()


            const novoJogo = await this.gameBusiness.criarJogo(idjogo,nomejogo, genero, datalancamento, preco);
            return res.status(201).json(novoJogo);
        } catch (error : any) {
            console.error('Erro ao criar novo jogo:', error);
            return res.status(error.status).json({ message: error.message});
        }
    }


    atualizarJogo = async (req: Request, res: Response): Promise<any> => {
        try {
        const { id } = req.params;
        const { nomejogo, genero, datalancamento, preco } = req.body;

        if(!nomejogo || !genero || !datalancamento ||!preco){
            return res.status(400).json({message: "Todos os campos devem ser preenchidos"})
        }

        if(typeof nomejogo !== "string" || typeof genero !== "string" || typeof datalancamento !== "string"){ 
            return res.status(400).json({message: "nomejogo , genero e datalancamento devem ser Strings"})
        }

        if(typeof preco !== "number"){
            return res.status(400).json({message: "preco deve ser um número"})
        }

            const jogoAtualizado = await this.gameBusiness.atualizarJogo(id, nomejogo, genero, datalancamento, preco);
            return res.status(200).json(jogoAtualizado);
        } catch (error : any ) {
            console.error('Erro ao atualizar o jogo:', error);
            return res.status(error.status).json({ message: error.message });
        }
    }


    deletarJogo = async (req: Request, res: Response): Promise<any> => {
        try {
        const { id } = req.params;


            await this.gameBusiness.deletarJogo(id);
            return res.status(200).json({ message: `Jogo com ID ${id} deletado com sucesso` });
        } catch (error : any) {
            console.error('Erro ao deletar jogo:', error);
            return res.status(404).json({message : error.message})
        }
}
    }

