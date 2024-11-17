import { UserData } from "../data/UserData";

export class UserBusiness {
  userData = new UserData();

  verUsuarios = async (): Promise<any> => {
    try {
      const usuarios = await this.userData.verUsuarios();
      return usuarios;
    } catch (error) {
      throw new Error("Erro ao buscar usuarios na camada business");
    }
  };

  buscarUsuarioPorId = async (id: string): Promise<any> => {
    if (!id) {
      throw new Error("O ID é obrigatório");
    }

    try {
      return await this.userData.buscarUsuarioPorId(id);
    } catch (error) {
      throw new Error("Erro ao buscar usuário na camada Business");
    }
  };

  criarUsuario = async (
    paginaUsuario: number,
    nickUsuario: string,
    senha: number,
    email: string
  ): Promise<any> => {
    if (!nickUsuario || !senha || !email) {
      throw new Error("Todos os campos são obrigatórios");
    }

    try {
      const usuarioExistente = await this.userData.buscarUsuarioPorNickOuEmail(
        nickUsuario,
        email
      );
      if (usuarioExistente) {
        throw new Error("Usuário já existe com esse nick ou email");
      }

      return await this.userData.criarUsuario(
        paginaUsuario,
        nickUsuario,
        senha,
        email
      );
    } catch (error) {
      throw new Error("Erro ao criar usuário");
    }
  };

  atualizarUsuario = async (
    id: string,
    paginaUsuario: number,
    nickUsuario: string,
    senha: number,
    email: string
  ): Promise<any> => {
    if (!paginaUsuario || !nickUsuario || !senha || !email) {
      throw new Error("Todos os campos são obrigatórios");
    }

    try {
      return await this.userData.atualizarUsuario(
        id,
        paginaUsuario,
        nickUsuario,
        senha,
        email
      );
    } catch (error) {
      throw new Error("Erro ao atualizar usuário");
    }
  };

  deletarUsuario = async (id: string): Promise<void> => {
    try {
      await this.userData.deletarUsuario(id);
    } catch (error) {
      throw new Error("Erro ao deletar usuário");
    }
  };
}
