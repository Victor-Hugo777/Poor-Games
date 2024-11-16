import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { v7 as uuidv7 } from 'uuid';
import db from './connection';


const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Server rodando na porta 3003");
});

  app.get('/jogos', async (req: Request, res: Response): Promise<any> => {
    const { pagina = 1, limite = 10 } = req.query;

    const numeroPagina = Number(pagina);
    const numeroLimite = Number(limite);

    if (isNaN(numeroPagina) || isNaN(numeroLimite)) {
        return res.status(400).json({ message: "Página e Limite devem ser números" });
    }

    try {
        const jogos = await db('jogos')
            .select('*')
            .orderBy('idjogo','asc')
            //Páginação não está funcionando corretamente
            //.where('paginajogo', numeroPagina)
            .offset((numeroPagina - 1) * numeroLimite)
            .limit(numeroLimite);

        if (jogos.length === 0) {
            return res.status(404).json({ message: "Nenhum jogo encontrado nesta página" });
        }

        return res.json(jogos);

    } catch (error) {
        console.error('Erro ao buscar jogos:', error);
        return res.status(500).json({ message: 'Erro ao buscar jogos' });
    }
});

app.get('/jogos/genero', async (req: Request, res: Response): Promise<any> => {
    const { genero } = req.query;

    if (!genero) {
        return res.status(400).json({ message: "Gênero é obrigatório" });
    }

    try {
        const jogos = await db('jogos')
            .select('*')
            .where('genero', 'like', `%${genero}%`);

        if (jogos.length === 0) {
            return res.status(404).json({ message: `Nenhum jogo encontrado para o gênero: ${genero}` });
        }

        return res.json(jogos);

    } catch (error) {
        console.error('Erro ao buscar jogos por gênero:', error);
        return res.status(500).json({ message: 'Erro ao buscar jogos' });
    }
});

app.post('/jogos', async (req: Request, res: Response): Promise<any> => {
    const { nomejogo, genero, datalancamento, paginajogo, preco } = req.body;

    if (!nomejogo || !genero || !datalancamento || !paginajogo || preco === undefined) {
        return res.status(400).json({ message: 'Todos os campos (nomejogo, genero, dataLancamento, paginajogo, preco) são obrigatórios' });
    }

    try {

        const jogoExistente = await db('jogos').where('nomejogo', nomejogo).first();

        if (jogoExistente) {
            return res.status(409).json({ message: 'Jogo já existe no banco de dados' });
        }

        const id = uuidv7();

        const [novoJogo] = await db('jogos').insert({
            nomejogo,
            genero,
            datalancamento,
            paginajogo,
            preco
        }).returning('*');

        return res.status(201).json(novoJogo);

    } catch (error: unknown) {
        console.error('Erro ao criar novo jogo:', error);

        if (error instanceof Error) {
            return res.status(500).json({ message: 'Erro ao criar novo jogo', error: error.message });
        }

        return res.status(500).json({ message: 'Erro desconhecido ao criar novo jogo' });
    }
});


app.put('/jogos/:id', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { nomejogo, genero, datalancamento, paginajogo, preco } = req.body;

    if (!nomejogo || !genero || !datalancamento || !paginajogo || preco === undefined) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const jogoAtualizado = await db('jogos')
            .where('idjogo', id)
            .update({
                nomejogo,
                genero,
                datalancamento,
                paginajogo,
                preco
            })
            .returning('*');

        if (jogoAtualizado.length === 0) {
            return res.status(404).json({ message: 'Jogo não encontrado' });
        }

        return res.status(200).json(jogoAtualizado[0]);
    } catch (error) {
        console.error('Erro ao atualizar o jogo:', error);
        return res.status(500).json({ message: 'Erro ao atualizar o jogo' });
    }
});

app.delete('/jogos/:id', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        const jogo = await db('jogos').where('idjogo', id).first();

        if (!jogo) {
            return res.status(404).json({ message: `Jogo com ID ${id} não encontrado` });
        }

        await db('jogos').where('idjogo', id).del();

        return res.status(200).json({ message: `Jogo com ID ${id} deletado com sucesso` });
    } catch (error) {
        console.error('Erro ao deletar jogo:', error);
        return res.status(500).json({ message: 'Erro ao deletar jogo' });
    }
});

app.get('/usuarios', async (req: Request, res: Response): Promise<any> =>{
    
})








