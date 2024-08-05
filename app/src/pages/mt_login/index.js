import React from 'react';
import LogInOut from './LogInOut';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarioLogado: '',
    };
  }

  config = {
    grant_type: 'authorization_code',
    client_id: 'projeto-template-integracao',
    redirect_uri: 'http://localhost:3000',

    url_token: 'https://dev.login.mt.gov.br/auth/realms/mt-realm/protocol/openid-connect/token',
    url_userInfo: 'https://dev.login.mt.gov.br/auth/realms/mt-realm/protocol/openid-connect/userinfo',

    url_login:
      'https://dev.login.mt.gov.br/auth/realms/mt-realm/protocol/openid-connect/auth?client_id=projeto-template-integracao&redirect_uri=http://localhost:3000&response_type=code',
    url_logout:
      'https://dev.login.mt.gov.br/auth/realms/mt-realm/protocol/openid-connect/logout?client_id=projeto-template-integracao&redirect_uri=http://localhost:3000&response_type=code',
  };

  verificaLogou() {
    //verifica a url de retorno depois de logar
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    const code = params.code;
    //console.log('CODE',code)

    if (code) {
      //obtem o token
      fetch(this.config.url_token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: this.config.grant_type,
          client_id: this.config.client_id,
          code: params.code,
          redirect_uri: this.config.redirect_uri,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          //console.log('TOKEN:', data.access_token)
          if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
            window.location = '/';
          }
        });
    }
  }

  obtemDadosUsuario() {
    if (localStorage.getItem('access_token')) {
      fetch(this.config.url_userInfo, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams({
          access_token: localStorage.getItem('access_token') || '',
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          //console.log('USUARIO LOGADO:', data.cpf, data.email)
          localStorage.setItem('usuarioLogado', JSON.stringify(data));
          this.setState({
            usuarioLogado: JSON.stringify(data),
          });
        });
    }
  }

  componentDidMount() {
    //console.log(localStorage.getItem('access_token'))

    this.verificaLogou();

    this.obtemDadosUsuario();
  }

  render() {
    return (
      <div id='App'>
        <header>
          <LogInOut uriLogout={this.config.url_logout} uriLogin={this.config.url_login} usuarioLogado={this.state.usuarioLogado} />
        </header>
      </div>
    );
  }
}
