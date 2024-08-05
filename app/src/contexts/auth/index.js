import React, { createContext, useState, useEffect, ReactNode } from 'react';
const AuthContext = createContext(null);
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export const AuthProvider = ({ children }) => {
  const [User, setUser] = useState({ id: '1', nome: 'Usuário Teste', given_name: 'Usuário', email: 'emailteste@gmail.com' });
  const [Mensagens, setMensagens] = useState([]);
  const [DEV, setDEV] = useState(process.env.NODE_ENV === 'development');
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const auth = (Code, Pagina, Modo) => {
    if (!verificarPermissoesPagina(Pagina, Modo)) {
      navigate(ROUTES.SEM_PERMISSAO);
    }
  };

  const verificarPermissoesPagina = (Pagina, Modo) => {
    if (DEV) {
      console.log('verificarPermissoesPagina');
      console.log('Pagina : ' + Pagina);
      console.log('Modo : ' + Modo);
    }

    return true;
  };

  const signInContext = (UserParm) => {
    const { access_token, given_name, family_name, cpf, email, matricula, perfis, funcionalidades_acoes } = UserParm;

    const Usuario = {
      nome: given_name + ' ' + family_name,
      cpf,
      email,
      matricula,
      perfis,
      funcionalidades_acoes,
      access_token,
    };

    localStorage.setItem('usuario_logado', JSON.stringify(Usuario));
    setUser(Usuario);
  };

  const signOutContext = async () => {
    localStorage.removeItem('usuario_logado');

    setUser(null);
  };

  const getURLBase = () => {
    let Dominio = window.location.hostname;

    let URLBase = Dominio.indexOf('localhost') >= 0 ? 'http://localhost:3006' : `https://${Dominio}`;
    //console.log('Dominio : ' + Dominio);
    //console.log('URLBase : ' + URLBase);

    return URLBase;
  };

  const getNomeUsuario = () => {
    return User ? `${User.nome}` : '';
  };

  const getMensagens = () => {
    const MensagensAux = Mensagens;
    setMensagens([]);

    return MensagensAux;
  };

  const addMensagem = (MSG) => {
    let MensagensAux = Mensagens;
    MensagensAux.push(MSG);
    setMensagens(MensagensAux);

    return MensagensAux;
  };

  return (
    <AuthContext.Provider
      value={{
        User: User,
        NomeUsuario: getNomeUsuario(),
        setUser: setUser,
        DEV: DEV,
        signInContext: signInContext,
        signOutContext: signOutContext,
        getURLBase: getURLBase,
        auth: auth,
        addMensagem: addMensagem,
        getMensagens: getMensagens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
