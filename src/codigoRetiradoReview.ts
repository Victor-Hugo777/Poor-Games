//pasta referente ao codigo que eu acidentalmente acabei tirando da entidade Review
//Obs: nâo coloquei os vetores devolta pois agora estamos trabalhando diretamente
//com banco de dados antes estavamos somente o simulando com vetores

//RESUMIDAMENTE: crie a tabela Avaliacoes no banco e faça INSERTS

app.get('/avaliacoes', (req: Request, res: Response): any => {
    const { pagina = 1, limite = 10 } = req.query;
    
    const numeroPagina = Number(pagina);
    const numeroLimite = Number(limite);
    
    if (isNaN(numeroPagina) || isNaN(numeroLimite)) {
        return res.status(400).json({ message: "Página e Limite devem ser números" });
    }
    const avaliacoesFiltrados = Reviews.filter(review => review.pagina === numeroPagina);
    
    const indexInicial = (numeroPagina - 1) * numeroLimite;
    const indexFinal = indexInicial + numeroLimite;
    
    const avaliacoesPaginados = avaliacoesFiltrados.slice(indexInicial, indexFinal);

    return res.json(avaliacoesPaginados);


});

app.get('/avaliacoes/busca', (req: Request, res: Response): any => {
    const { filter } = req.query;
    const idAvaliacao = Number(filter);
    if (!filter) {
        return res.status(400).json({ message: "filtro Obrigatório" });
    }
    const avaliacoesPorbusca = Reviews.filter(review => review.id == idAvaliacao);
    if (avaliacoesPorbusca.length === 0) {
        return res.status(404).json({ message: "Nenhum avaliação encontrado" });
    }
    return res.json(avaliacoesPorbusca);
});

app.post('/avaliacoes', (req: Request, res: Response): any => {
    const {idUser, idGame, nota } = req.body;
    if (!idUser || !idGame || !nota) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }
    const idUnico = uuidv7();
    const avaliacaoExistente = Reviews.find(review => review.idUser === idUser);
    if (avaliacaoExistente) {
        return res.status(400).json({ message: "avaliacao com este usuario já existe." });
    }
    const novaAvaliacoes: review = {
        id: idUnico,
        pagina: 1,
        idUser,
        idGame,
        nota
    };
    Reviews.push(novaAvaliacoes);
    return res.status(201).json(novaAvaliacoes);
});