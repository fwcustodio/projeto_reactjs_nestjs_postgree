import React from 'react';

export default class LogInOut extends React.Component {

  render() {
    const usuarioLogado = this.props.usuarioLogado ? JSON.parse(this.props.usuarioLogado) : null;

    console.log('usuarioLogado',usuarioLogado)

    return (
      <>
        {usuarioLogado?.cpf && 
        <>
            <span> Olá, {usuarioLogado.name}! </span>
            <p>Seu CPF cadastrado é: {usuarioLogado.cpf}</p>
            <br/>
            <a href={this.props.uriLogout}>sign out</a>
        </>}
        
        {!usuarioLogado?.cpf && 
            <a href={this.props.uriLogin}>sign in</a>}
      </>
    );
  }
}
