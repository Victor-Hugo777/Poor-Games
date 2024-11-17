import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  userBusiness = new UserBusiness();

  verUsuarios = async (req: Request, res: Response): Promise<any> => {
    try {
      const usuarios = await this.userBusiness.verUsuarios();
      return res.json(usuarios);
    } catch (error) {
      console.error("Error ao buscar usuários:", error);
      return res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  };

  buscarUsuarioPorId = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "O parâmetro 'id' é obrigatório" });
    }

    try {
      const usuario = await this.userBusiness.buscarUsuarioPorId(id);

      if (!usuario) {
        return res
          .status(404)
          .json({ message: `Usuário com ID ${id} não encontrado` });
      }

      return res.json(usuario);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  };

  criarUsuario = async (req: Request, res: Response): Promise<any> => {
    const { paginaUsuario, nickUsuario, senha, email } = req.body;

    try {
      const novoUsuario = await this.userBusiness.criarUsuario(
        paginaUsuario,
        nickUsuario,
        senha,
        email
      );
      return res.status(201).json(novoUsuario);
    } catch (error) {
      console.error("Erro ao criar novo usuário:", error);
      return res.status(500).json({ message: "Erro ao criar novo usuário" });
    }
  };

  atualizarUsuario = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { paginaUsuario, nickUsuario, senha, email } = req.body;

    try {
      const usuarioAtualizado = await this.userBusiness.atualizarUsuario(
        id,
        paginaUsuario,
        nickUsuario,
        senha,
        email
      );
      return res.status(200).json(usuarioAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      return res.status(500).json({ message: "Erro ao atualizar o usuário" });
    }
  };

  deletarUsuario = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
      await this.userBusiness.deletarUsuario(id);
      return res
        .status(200)
        .json({ message: `Usuário com ID ${id} deletado com sucesso` });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return res.status(500).json({ message: "Erro ao deletar usuário" });
    }
  };
}
