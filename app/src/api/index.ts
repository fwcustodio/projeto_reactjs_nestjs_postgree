import { MENSAGENS } from '../utils';

const URL_API = process.env.URL_API ?? '';

/*
OBS

 A grid trabalha com o valor da página iniciando em 0, porem melhor trablhar com 1, então sempre que for passar o valor da página para a API, adicionar +1

*/

export interface PaginationModel {
  page: number;
  pageSize: number;
}

const getRespostasPadraoAPI = async (Response: Response | null): Promise<{ Status: string; Mensagem: string }> => {
  if (Response?.status == 200 || Response?.status == 201) {
    return { Status: 'OK', Mensagem: 'Operação realizada com sucesso!' };
  } else {
    const RespJson = await Response?.json();

    const MensagemErro = RespJson?.message ? RespJson.message : '';
    const TipoErro = RespJson?.error ? RespJson.error : '';
    const MensagemErroLower = MensagemErro.toLowerCase();

    if (TipoErro == 'Prisma Know Error') {
      if (MensagemErroLower.indexOf('unique') >= 0) {
        switch (true) {
          case MensagemErroLower.indexOf('nome') >= 0:
            return { Status: 'ERRO', Mensagem: `O nome ${MENSAGENS.REGISTRO_JA_CADASTRADO}` };
          case MensagemErroLower.indexOf('cpf') >= 0:
            return { Status: 'ERRO', Mensagem: `O cpf ${MENSAGENS.REGISTRO_JA_CADASTRADO}` };
          case MensagemErroLower.indexOf('email') >= 0:
            return { Status: 'ERRO', Mensagem: `O e-mail ${MENSAGENS.REGISTRO_JA_CADASTRADO}` };
          case MensagemErroLower.indexOf('cnpj') >= 0:
            return { Status: 'ERRO', Mensagem: `O cnpj ${MENSAGENS.REGISTRO_JA_CADASTRADO}` };
          default:
            return { Status: 'ERRO', Mensagem: MensagemErro };
        }
      }
      return { Status: 'ERRO', Mensagem: MensagemErro };
    } else {
      return { Status: 'ERRO', Mensagem: 'Erro ao realizar a operação!' };
    }
  }
};

//DEPARTAMENTOS
const ROTA_DEPARTAMENTOS = 'departamentos';
export const getDepartamentos = async (TextoBusca: string | null, PaginationModel: PaginationModel) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_DEPARTAMENTOS}${TextoBusca ? '/search/' + TextoBusca : ''}`, {
      headers: {
        mode: 'no-cors',
        'x-pagina': (PaginationModel.page + 1).toString(),
        'x-qtd-por-pagina': PaginationModel.pageSize.toString(),
      },
    });
    const Headers = response.headers;

    return { dados: await response.json(), total_registros: parseInt(Headers.get('X-Total-Registros') ?? '') };
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const getDepartamento = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_DEPARTAMENTOS}/${ID}`);
    return response.json();
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const cadastrarDepartamento = async (Dados: object) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_DEPARTAMENTOS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Dados),
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

export const alterarDepartamento = async (Dados: object, ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_DEPARTAMENTOS}/${ID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Dados),
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

export const excluirDepartamento = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_DEPARTAMENTOS}/${ID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

//PERFIS
const ROTA_PERFIS = 'perfis';
export const getPerfis = async (TextoBusca: string | null, Status: string | null, PaginationModel: PaginationModel) => {
  try {
    let URL = `${URL_API}/${ROTA_PERFIS}`;
    if (TextoBusca && Status != '-1') {
      URL = `${URL}/search/${TextoBusca}/${Status}`;
    } else if (TextoBusca) {
      URL = `${URL}/search/${TextoBusca}`;
    } else if (Status && Status != '-1') {
      URL = `${URL}/search/null/${Status}`;
    }

    const response = await fetch(`${URL}`, {
      headers: {
        mode: 'no-cors',
        'x-pagina': (PaginationModel.page + 1).toString(),
        'x-qtd-por-pagina': PaginationModel.pageSize.toString(),
      },
    });
    const Headers = response.headers;

    return { dados: await response.json(), total_registros: parseInt(Headers.get('X-Total-Registros') ?? '') };
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const getPerfisAtivos = async () => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_PERFIS}/ativos`);
    return await response.json();
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const getPerfil = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_PERFIS}/${ID}`);
    return response.json();
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const cadastrarPerfil = async (Dados: object) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_PERFIS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Dados),
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

export const alterarPerfil = async (Dados: object, ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_PERFIS}/${ID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Dados),
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

export const excluirPerfil = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_PERFIS}/${ID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

//ORGÃOS EMPRESAS
const ROTA_ORGAOS_EMPRESAS = 'orgaos';
export const getOrgaosEmpresas = async (TextoBusca: string | null, PaginationModel: PaginationModel) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_ORGAOS_EMPRESAS}${TextoBusca ? '/search/' + TextoBusca : ''}`, {
      headers: {
        mode: 'no-cors',
        'x-pagina': (PaginationModel.page + 1).toString(),
        'x-qtd-por-pagina': PaginationModel.pageSize.toString(),
      },
    });
    const Headers = response.headers;

    return { dados: await response.json(), total_registros: parseInt(Headers.get('X-Total-Registros') ?? '') };
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const getOrgaoEmpresa = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_ORGAOS_EMPRESAS}/${ID}`);
    return response.json();
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const cadastrarOrgaoEmpresa = async (Dados: object) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_ORGAOS_EMPRESAS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Dados),
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

export const alterarOrgaoEmpresa = async (Dados: object, ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_ORGAOS_EMPRESAS}/${ID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Dados),
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

export const excluirOrgaoEmpresa = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_ORGAOS_EMPRESAS}/${ID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

//AÇÕES
const ROTA_ACOES = 'acoes';
export const getAcoes = async (TextoBusca: string | null, PaginationModel: PaginationModel) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_ACOES}${TextoBusca ? '/search/' + TextoBusca : ''}`, {
      headers: {
        mode: 'no-cors',
        'x-pagina': (PaginationModel.page + 1).toString(),
        'x-qtd-por-pagina': PaginationModel.pageSize.toString(),
      },
    });
    const Headers = response.headers;

    return { dados: await response.json(), total_registros: parseInt(Headers.get('X-Total-Registros') ?? '') };
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const getAcoesAtivas = async () => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_ACOES}/ativas`);
    const Headers = response.headers;

    return await response.json();
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const getAcao = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_ACOES}/${ID}`);
    return response.json();
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const cadastrarAcao = async (Dados: object) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_ACOES}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Dados),
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

export const alterarAcao = async (Dados: object, ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_ACOES}/${ID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Dados),
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

export const excluirAcao = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_ACOES}/${ID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

//FUNCIONALIDADES
const ROTA_FUNCIONALIDADES = 'funcionalidades';
export const getFuncionalidades = async (TextoBusca: string | null, PaginationModel: PaginationModel) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_FUNCIONALIDADES}${TextoBusca ? '/search/' + TextoBusca : ''}`, {
      headers: {
        mode: 'no-cors',
        'x-pagina': (PaginationModel.page + 1).toString(),
        'x-qtd-por-pagina': PaginationModel.pageSize.toString(),
      },
    });
    const Headers = response.headers;

    return { dados: await response.json(), total_registros: parseInt(Headers.get('X-Total-Registros') ?? '') };
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const getFuncionalidadesAtivas = async () => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_FUNCIONALIDADES}/ativas`);
    const Headers = response.headers;

    return await response.json();
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const getFuncionalidade = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_FUNCIONALIDADES}/${ID}`);
    return response.json();
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const cadastrarFuncionalidade = async (Dados: object) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_FUNCIONALIDADES}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Dados),
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

export const alterarFuncionalidade = async (Dados: object, ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_FUNCIONALIDADES}/${ID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Dados),
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

export const excluirFuncionalidade = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_FUNCIONALIDADES}/${ID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

//TIPOS_SERVIDORES
const ROTA_TIPOS_SERVIDORES = 'tipos-servidores';
export const getTiposServidores = async (TextoBusca: string | null, PaginationModel: PaginationModel) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_TIPOS_SERVIDORES}${TextoBusca ? '/search/' + TextoBusca : ''}`, {
      headers: {
        mode: 'no-cors',
        'x-pagina': (PaginationModel.page + 1).toString(),
        'x-qtd-por-pagina': PaginationModel.pageSize.toString(),
      },
    });
    const Headers = response.headers;

    return { dados: await response.json(), total_registros: parseInt(Headers.get('X-Total-Registros') ?? '') };
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const getTipoServidor = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_TIPOS_SERVIDORES}/${ID}`);
    return response.json();
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const cadastrarTipoServidor = async (Dados: object) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_TIPOS_SERVIDORES}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Dados),
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

export const alterarTipoServidor = async (Dados: object, ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_TIPOS_SERVIDORES}/${ID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Dados),
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

export const excluirTipoServidor = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_TIPOS_SERVIDORES}/${ID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

//USUÁRIOS
const ROTA_USUARIOS = 'usuarios';
export const getUsuarios = async (TextoBusca: string | null, Status: string | null, Perfil: string | null, PaginationModel: PaginationModel) => {
  try {
    const URL = `${URL_API}/${ROTA_USUARIOS}/search/${TextoBusca && TextoBusca.length > 0 ? TextoBusca : 'null'}/${Status && Status != '-1' ? Status : 'null'}/${Perfil && Perfil != '-1' ? Perfil : 'null'}`;

    const response = await fetch(`${URL}`, {
      headers: {
        mode: 'no-cors',
        'x-pagina': (PaginationModel.page + 1).toString(),
        'x-qtd-por-pagina': PaginationModel.pageSize.toString(),
      },
    });
    const Headers = response.headers;

    return { dados: await response.json(), total_registros: parseInt(Headers.get('X-Total-Registros') ?? '') };
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const getCombosUsuarios = async () => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_USUARIOS}/dados-combos`, {
      headers: {
        mode: 'no-cors',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const getUsuario = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_USUARIOS}/${ID}`);
    return response.json();
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const getUsuarioPermissoes = async (CPF: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_USUARIOS}/permissoes/${CPF}`);
    return response.json();
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const cadastrarUsuario = async (Dados: object) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_USUARIOS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Dados),
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

export const alterarUsuario = async (Dados: object, ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_USUARIOS}/${ID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Dados),
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};

export const atualizarAcessoUsuario = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_USUARIOS}/atualizar-acesso/${ID}`);
    return response.json();
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return null;
  }
};

export const excluirUsuario = async (ID: string) => {
  try {
    const response = await fetch(`${URL_API}/${ROTA_USUARIOS}/${ID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return getRespostasPadraoAPI(response);
  } catch (error) {
    console.error('Erro ao executar a solicitação para a API : ', error);
    return getRespostasPadraoAPI(null);
  }
};
