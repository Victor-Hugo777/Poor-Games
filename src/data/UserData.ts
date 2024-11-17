import db from "../connection";

export class UserData {
  verUsuarios = async (): Promise<any> => {
    try {
      const usuarios = await db("usuarios")
        .select("*")
        .orderBy("idusuario", "asc");

      return usuarios;
    } catch (error: any) {
      throw new Error(error.message || error.stack);
    }
  };

  buscarUsuarioPorId = async (id: string): Promise<any> => {
    try {
      const usuario = await db("Usuarios").where("idUsuario", id).first();

      if (!usuario) {
        return null;
      }

      return usuario;
    } catch (error: any) {
      throw new Error(error.message || error.stack);
    }
  };

  criarUsuario = async (
    paginaUsuario: number,
    nickUsuario: string,
    senha: number,
    email: string
  ): Promise<any> => {
    try {
      const [novoUsuario] = await db("Usuarios")
        .insert({
          paginaUsuario,
          nickUsuario,
          senha,
          email,
        })
        .returning("*");
      return novoUsuario;
    } catch (error: any) {
      throw new Error(error.message || error.stack);
    }
  };

  atualizarUsuario = async (
    id: string,
    paginaUsuario: number,
    nickUsuario: string,
    senha: number,
    email: string
  ): Promise<any> => {
    try {
      const usuarioAtualizado = await db("Usuarios")
        .where("idUsuario", id)
        .update({
          paginaUsuario,
          nickUsuario,
          senha,
          email,
        })
        .returning("*");
      return usuarioAtualizado;
    } catch (error: any) {
      throw new Error(error.message || error.stack);
    }
  };

  deletarUsuario = async (id: string): Promise<void> => {
    try {
      await db("Usuarios").where("idUsuario", id).del();
    } catch (error: any) {
      throw new Error(error.message || error.stack);
    }
  };

  buscarUsuarioPorNickOuEmail = async (
    nickUsuario: string,
    email: string
  ): Promise<any> => {
    try {
      const usuario = await db("Usuarios")
        .where("nickUsuario", nickUsuario)
        .orWhere("email", email)
        .first();
      return usuario;
    } catch (error: any) {
      throw new Error(error.message || error.stack);
    }
  };
}
