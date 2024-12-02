import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { generateId } from "../middlewares/idGenerator";

export class UserController {
  userBusiness = new UserBusiness();

  verUsuarios = async (req : Request, res: Response): Promise<any> =>{
    try {
            
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        
        const usuarios = await this.userBusiness.verUsuarios(page,limit);
        return res.json(usuarios);
    
    } catch (error : any) {
        console.error('Erro ao busar Usuários', error);
        return res.status(500).json({ message: error.message});
    }
}

buscarUsuarioPorId = async (req: Request, res: Response): Promise<any> => {
    try{
        const { id } = req.params;

        const usuario = await this.userBusiness.buscarUsuarioPorId(id);
        return res.json(usuario);
    } catch (error : any) {
        console.error('Erro ao buscar Usuário:', error);
        return res.status(error.status).json({ message: error.message});
    }
}
  

  cadastrarUsuario = async (req: Request, res: Response): Promise<any> => {
    try{
    const {  nickusuario, senha, email} = req.body;

    if( !nickusuario|| !senha || !email){
        return res.status(400).json({message: "Todos os campos devem ser preenchidos"})
    }

    if(senha.length < 6){
        return res.status(400).json({message: "Senha deve ter pelo menos 6 caracteres"})
    }

    if(!email.includes("@") || !email.includes(".")){
        return res.status(400).json({message: "Email inválido"})
    }

    if(nickusuario.length < 3){
        return res.status(400).json({message: "Nick deve ter pelo menos 3 caracteres"})
    }


    const idusuario = generateId()

        const novoUsuario = await this.userBusiness.cadastrarUsuario(idusuario,nickusuario,senha,email);
        return res.status(201).json(novoUsuario);
    } catch (error : any) {
        console.error('Erro ao criar novo usuário Controller:', error);
        return res.status(500).json({ message: error.message});
    }
};

atualizarUsuario = async (req: Request, res: Response): Promise<any> => {
    try{
    const { id } = req.params;
    const { nickusuario, senha, email } = req.body;

    if (!nickusuario || !senha || !email) {
        return res.status(400).json({ message: "Todos os campos devem ser preenchidos" });
    }

    const usuarioAtualizado = await this.userBusiness.atualizarUsuario(id, nickusuario, senha, email);
    return res.json(usuarioAtualizado);
    } catch (error : any) {
        console.error('Erro ao atualizar Usuário Controller:', error);
        return res.status(error.status).json({ message: error.message });
    }
};

deletarUsuario = async (req: Request, res: Response): Promise<any> => {
    try{
    const { id } = req.params;
    if(!id){	
        throw {status : 400, message: "ID do Usuário é obrigatório"}
    }
    
    const usuarioDeletado = await this.userBusiness.deletarUsuario(id);
    return res.status(200).json({ message: `Usuário com ID ${id} deletado com sucesso` });
    } catch (error : any) {
        console.error('Erro ao deletar Usuário Controller:', error);
        return res.status(error.status).json({ message: error.message });
    }
};

}
