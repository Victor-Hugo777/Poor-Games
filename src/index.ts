import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Server rodando na porta 3003");
});
type game = {
    id: number,
    pagina: number,
    nome: string,
    dataLancamento: string,
    genero: string
    preco: number
}


const Games : game[] = [
    {
        id: 1,
        pagina: 1,
        nome: "Tower Of Fantasy",
        dataLancamento: "16/12/2021",
        genero: "MMORPG",
        preco: 200,
    },
    {
        id: 2,
        pagina: 1,
        nome: "Batman Arknight",
        dataLancamento: "23/06/2015",
        genero: "Ação",
        preco: 145
    }
];

app.get('/jogos', (req: Request, res: Response): any => {
    const { página = 1, limite = 10 } = req.query;

    const numeroPagina = Number(página);
    const numeroLimite = Number(limite);

    if (isNaN(numeroPagina) || isNaN(numeroLimite)) {
        return res.status(400).json({ message: "Página e Limite devem ser números" });
    }

    const jogosFiltrados = Games.filter(game => game.pagina === numeroPagina);      

    const indexInicial = (numeroPagina - 1) * numeroLimite;
    const indexFinal = indexInicial + numeroLimite;

    const jogosPaginados = jogosFiltrados.slice(indexInicial, indexFinal);

    return res.json(jogosPaginados);
});

app.get('/jogos/genero', (req: Request, res: Response): any => {
    const { genero } = req.query;

    if (!genero) {
        return res.status(400).json({ message: "Gênero Obrigatório" });
    }

    const jogosPorGenero = Games.filter(game => game.genero === genero);

    if (jogosPorGenero.length === 0) {
        return res.status(404).json({ message: "Nenhum jogo encontrado" });
    }

    return res.json(jogosPorGenero);
});

app.post('/jogos', (req: Request, res: Response): any => {
    const { id, nome, dataLancamento, genero, preco } = req.body;

    if (!id || !nome || !dataLancamento || !genero || !preco) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const novoJogo: game = {
        id,
        pagina: 1,
        nome,
        dataLancamento,
        genero,
        preco
    };

    Games.push(novoJogo);

    return res.status(201).json(novoJogo);
});

app.put('/jogos',(req : Request, res : Response): any => {

});

type user = {
    id: number,
    pagina : number,
    nick: string,
    senha: string 
    email: string,
}
const Users: user[] = [
{
    id: 1,
    pagina : 1,
    nick: "ADCpçãodaFamilia",
    senha:"SkibidiToiletRizz",
    email: "espantaxota@gmail.com"
},

{
    id: 2,
    pagina :1,
    nick: "Momoi",
    senha:"Kuyashi",
    email: "Kachira@gmail.com" 
},
]

app.get('/usuarios', (req: Request, res: Response): any => {
    const { pagina = 1, limite = 10 } = req.query;

    const numeroPagina = Number(pagina);
    const numeroLimite = Number(limite);

    if (isNaN(numeroPagina) || isNaN(numeroLimite)) {
        return res.status(400).json({ message: "Página e Limite devem ser números" });
    }

    const usuariosFiltrados = Users.filter(user => user.pagina === numeroPagina);

    const indexInicial = (numeroPagina - 1) * numeroLimite;
    const indexFinal = indexInicial + numeroLimite;

    const usuariosPaginados = usuariosFiltrados.slice(indexInicial, indexFinal);

    return res.json(usuariosPaginados);
});

app.get('/avaliacoes', (req: Request, res: Response): any => {
    const { pagina = 1, limite = 10 } = req.query;

    const numeroPagina = Number(pagina);
    const numeroLimite = Number(limite);

    if (isNaN(numeroPagina) || isNaN(numeroLimite)) {
        return res.status(400).json({ message: "Página e Limite devem ser números" });
    }

    
})