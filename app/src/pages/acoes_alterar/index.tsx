import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Container, IconButton, Typography, FormLabel, TextField, MenuItem } from '@mui/material';

import { FONT_SIZE, MODOS, MENSAGENS, getNomeFormatado } from '../../utils';
import { ROUTES } from '../../routes';

import ContainerPainel from '../../components/container_painel';
import AuthContext from '../../contexts/auth';
import { BoxPrincipal, BoxBotoes } from '../../components/form_box';
import Loading from '../../components/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { getAcao, cadastrarAcao, alterarAcao, excluirAcao } from '../../api';
import { BotaoSalvar, BotaoExcluir, BotaoFechar, BotaoEditar } from '../../components/botoes';
import InputDados from '../../components/input_dados';

const AcoesEditar: React.FC = (props) => {
  const { addMensagem }: { addMensagem?: (mensagem: string) => void } = useContext(AuthContext) || {
    addMensagem: (mensagem: string) => {},
  };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [LoadingInicio, setLoadingInicio] = useState(true);

  const { id, modo }: { id?: string; modo?: string } = useParams();
  const [Acao, setAcao] = useState<any>({});
  const [Nome, setNome] = useState<string>('');
  const [Situacao, setSituacao] = useState<string>('Ativo');
  const DISABILITAR_CAMPOS = modo == MODOS.VISUALIZAR || modo == MODOS.EXCLUIR;

  useEffect(() => {
    //console.log('id', id);
    //console.log('modo', modo);

    carregarDados();
    return () => {};
  }, []);

  const carregarDados = async () => {
    if (id) {
      const AcaoAux = await getAcao(id);
      setAcao(AcaoAux);
      //console.log('Acao', JSON.stringify(AcaoAux));

      if (AcaoAux) {
        const { nome, descricao, situacao } = AcaoAux;

        setNome(nome);
        setSituacao(situacao);
      }
    }

    setLoadingInicio(false);
    setLoading(false);
  };

  const validarDados = () => {
    if (!Nome || Nome.trim() == '') {
      alert(`Nome ${MENSAGENS.PREENCHIMENTO_OBRIGATORIO}`);
      return false;
    }

    return true;
  };

  const salvarDados = async () => {
    if (!validarDados()) return;
    setLoading(true);

    const Dados = {
      nome: getNomeFormatado(Nome),
      situacao: Situacao,
    };

    let Resp;

    switch (modo) {
      case MODOS.CADASTRAR:
        Resp = await cadastrarAcao(Dados);
        break;
      case MODOS.ALTERAR:
        Resp = await alterarAcao(Dados, id ?? '');
        break;
    }

    setLoading(false);

    if (Resp && Resp.Status == 'OK') {
      addMensagem(modo == MODOS.CADASTRAR ? MENSAGENS.REGISTRO_CADASTRADO_SUCESSO : MENSAGENS.REGISTRO_ALTERADO_SUCESSO);

      navigate(ROUTES.ACOES);
    } else if (Resp) {
      alert(Resp.Mensagem);
    }
  };

  const excluirRegistro = async () => {
    if (!confirm(MENSAGENS.EXCLUIR_REGISTRO)) return;
    setLoading(true);

    const Resp = await excluirAcao(id ?? '');

    setLoading(false);

    if (Resp && Resp.Status == 'OK') {
      addMensagem(MENSAGENS.REGISTRO_EXCLUIDO_SUCESSO);
      navigate(ROUTES.ACOES);
    } else if (Resp) {
      alert(Resp.Mensagem);
    }
  };

  const editarRegistro = async () => {
    navigate(`${ROUTES.ACOES}/${id}/${MODOS.ALTERAR}`);
  };

  return (
    <ContainerPainel modo={modo} pagina_acima={'Ações'} link_pagina_acima={ROUTES.ACOES}>
      <BoxPrincipal>
        {!LoadingInicio && (
          <>
            <InputDados id='id' variant='outlined' disabled label='Código' value={id} size='small' />
            <InputDados
              id='nome'
              label='Nome'
              value={Nome}
              onChange={(event: { target: { value: string } }) => setNome(event.target.value)}
              variant='outlined'
              size='small'
              fullWidth
              disabled={DISABILITAR_CAMPOS}
              required
            />
            <InputDados
              select
              id='situacao' // obrigatorio
              label='Situação' // obrigatorio
              placeholder='Situação'
              value={Situacao}
              onChange={(event: { target: { value: string } }) => {
                setSituacao(event.target.value);
              }}
              size='small'
              fullWidth
              disabled={DISABILITAR_CAMPOS}
            >
              <MenuItem value={'Ativo'}>Ativo</MenuItem>
              <MenuItem value={'Inativo'}>Inativo</MenuItem>
            </InputDados>
            <BoxBotoes>
              {(MODOS.ALTERAR == modo || MODOS.CADASTRAR == modo) && <BotaoSalvar onClick={salvarDados} />}
              {MODOS.EXCLUIR == modo && <BotaoExcluir onClick={excluirRegistro} />}
              {MODOS.VISUALIZAR == modo && <BotaoEditar onClick={editarRegistro} />}

              <BotaoFechar modo={modo} />
            </BoxBotoes>
          </>
        )}
        {loading && <Loading />}
      </BoxPrincipal>
    </ContainerPainel>
  );
};

export default AcoesEditar;
