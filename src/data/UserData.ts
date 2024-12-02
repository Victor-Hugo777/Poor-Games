import db from "../connection";

export class UserData {
  verUsuarios = async (page: number, limit: number): Promise<any> => {
    try {
      const offset = (page - 1) * limit;
      const usuarios = await db("usuarios")
        .select("*")
        .orderBy("idusuario", "asc")
        .limit(limit)
        .offset(offset);
      
        return usuarios;
    
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };

  buscarUsuarioporId = async (id: string): Promise<any> => {
    try {
      const usuario = await db("usuarios").where("idusuario", id).first();
      return usuario;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };

  buscarUsuarioPorNick = async (nickUsuario: string): Promise<any> => {
    try {
      const usuario = await db("usuarios")
        .where("nickusuario", nickUsuario)
        .first();
        return usuario;
    
      } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };

  buscarUsuarioPorEmail = async (email: string): Promise<any> => {
    try {
      const usuario = await db("usuarios")
        .where("email", email)
        .first();
      return usuario;

    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };
  cadastrarUsuario = async (
    idusuario: string,
    nickusuario: string,
    senha: string,
    email: string
  ): Promise<any> => {
    try {
      const [novoUsuario] = await db("usuarios")
        .insert({
          idusuario,
          nickusuario,
          senha,
          email,
        })
        .returning("*");
      return novoUsuario;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };

  atualizarUsuario = async (
    id: string,
    nickusuario: string,
    senha: string,
    email: string
  ): Promise<any> => {
    try {
      const [usuarioAtualizado] = await db("usuarios")
        .where("idusuario", id)
        .update({
          nickusuario,
          senha,
          email,
        })
        .returning("*");
      return usuarioAtualizado;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };

  deletarUsuario = async (id: string): Promise<any> => {
    try {
      const usuarioDeletado = await db("usuarios").where("idusuario", id).del();
      return usuarioDeletado;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error.stack);
    }
  };
}
