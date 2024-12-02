import { UserData } from "../data/userData"

export class UserBusiness {
  userData = new UserData();

  verUsuarios = async (page : number,limit : number): Promise<any> => {
    try {
      const usuarios = await this.userData.verUsuarios(page,limit);
      return usuarios;
    
    } catch (error:any) {
      throw {status : 500, message: "Erro ao buscar Usuários"}
    }
  };

  buscarUsuarioPorId = async (id : string): Promise<any> => {
    try {
      const usuario = await this.userData.buscarUsuarioporId(id);
      if(usuario === undefined) {
        throw {status : 404, message: "O Usuário inserido não existe ou não foi encontrado"}
      }   
      return usuario;
    } catch (error : any) {
      throw {status : error.status , message: error.message}
  }  
}

  cadastrarUsuario = async (
    idusuario : string,
    nickusuario : string,
    senha :string,
    email : string
  ): Promise<any> => {
    try{
   
    const nickExistente = await this.userData.buscarUsuarioPorNick(nickusuario);
    if (nickExistente) {
      throw { status : 400 , message:`O nick ${nickusuario} ja existe`};
    }

    const emailExistente = await this.userData.buscarUsuarioPorEmail(email);
    if (emailExistente) {
      throw { status : 400 , message:`O email ${email} ja existe`};
    }


      return await this.userData.cadastrarUsuario(
        idusuario,
        nickusuario,
        senha,
        email
      );
    } catch (error : any) {
      console.error('Erro ao criar Usuário Business: ', error);
      throw {status : error.status , message: error.message}
    }
  
}

atualizarUsuario = async (idusuario : string, nickusuario : string, senha :string, email : string): Promise<any> => {
  try {

    const usuarioExistente = await this.userData.buscarUsuarioporId(idusuario);
    if (!usuarioExistente) {
      throw { status : 404 , message:"O Usuário que você quer atualizar não existe"};
    }

    const nickExistente = await this.userData.buscarUsuarioPorNick(nickusuario);
    if (nickExistente) {
      throw { status : 400 , message:`O nick ${nickusuario} ja existe`};
    }

    const emailExistente = await this.userData.buscarUsuarioPorEmail(email);
    if (emailExistente) {
      throw { status : 400 , message:`O email ${email} ja existe`};
    }

    return await this.userData.atualizarUsuario(idusuario, nickusuario, senha, email);
  } catch (error : any) {
  console.error('Erro ao atualizar Usuário Business:', error);
  throw {status : error.status , message: error.message}
  }
};

deletarUsuario = async (idusuario : string): Promise<any> => {
  try {
    const usuarioExistente = await this.userData.buscarUsuarioporId(idusuario);
    if (!usuarioExistente) {
      throw { status : 404 , message:"O Usuário que vocé quer deletar não existe"};
    }
    return await this.userData.deletarUsuario(idusuario);
  } catch (error : any) {
    console.error('Erro ao deletar Usuário Business:', error);
    throw {status : error.status , message: error.message}
  }
};

}
