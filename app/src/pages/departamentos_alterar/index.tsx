import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Container, IconButton, Typography, FormLabel, TextField, MenuItem } from '@mui/material';

import { FONT_SIZE, MODOS, MENSAGENS, getNomeFormatado } from '../../utils';
import { ROUTES } from '../../routes';

import ContainerPainel from '../../components/container_painel';
import AuthContext from '../../contexts/auth';
import { BoxPrincipal, BoxBotoes } from '../../components/form_box';
import Loading from '../../components/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { getDepartamento, cadastrarDepartamento, alterarDepartamento, excluirDepartamento } from '../../api';
import { BotaoSalvar, BotaoExcluir, BotaoFechar, BotaoEditar } from '../../components/botoes';

const DepartamentosEditar: React.FC = (props) => {
  const { addMensagem }: { addMensagem?: (mensagem: string) => void } = useContext(AuthContext) || {
    addMensagem: (mensagem: string) => {},
  };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [LoadingInicio, setLoadingInicio] = useState(true);

  const { id, modo }: { id?: string; modo?: string } = useParams();
  const [Departamento, setDepartamento] = useState<any>({});
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
      const DepartamentoAux = await getDepartamento(id);
      setDepartamento(DepartamentoAux);
      //console.log('Departamento', JSON.stringify(DepartamentoAux));

      if (DepartamentoAux) {
        const { nome, situacao } = DepartamentoAux;

        setNome(nome);
        setSituacao(situacao);
      }
    }

    setLoadingInicio(false);
    setLoading(false);
  };

  const validarDados = () => {
    let ValidouDados = true;

    if (!Nome || Nome.trim() == '') ValidouDados = false;

    return ValidouDados;
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
        Resp = await cadastrarDepartamento(Dados);
        break;
      case MODOS.ALTERAR:
        Resp = await alterarDepartamento(Dados, id ?? '');
        break;
    }

    setLoading(false);

    if (Resp && Resp.Status == 'OK') {
      addMensagem(modo == MODOS.CADASTRAR ? MENSAGENS.REGISTRO_CADASTRADO_SUCESSO : MENSAGENS.REGISTRO_ALTERADO_SUCESSO);

      navigate(ROUTES.DEPARTAMENTOS);
    } else if (Resp) {
      alert(Resp.Mensagem);
    }
  };

  const excluirRegistro = async () => {
    if (!confirm(MENSAGENS.EXCLUIR_REGISTRO)) return;
    setLoading(true);

    const Resp = await excluirDepartamento(id ?? '');

    setLoading(false);

    if (Resp && Resp.Status == 'OK') {
      addMensagem(MENSAGENS.REGISTRO_EXCLUIDO_SUCESSO);
      navigate(ROUTES.DEPARTAMENTOS);
    } else if (Resp) {
      alert(Resp.Mensagem);
    }
  };

  const editarRegistro = async () => {
    navigate(`${ROUTES.DEPARTAMENTOS}/${id}/${MODOS.ALTERAR}`);
  };

  return (
    <ContainerPainel modo={modo} pagina_acima={'Departamentos'} link_pagina_acima={ROUTES.DEPARTAMENTOS}>
      <BoxPrincipal>
        {!LoadingInicio && (
          <>
            <TextField id='id' variant='outlined' disabled label='Código' value={id} size='small' />
            <TextField
              id='nome'
              variant='outlined'
              size='small'
              fullWidth
              disabled={DISABILITAR_CAMPOS}
              label='Nome'
              value={Nome}
              onChange={(event) => setNome(event.target.value)}
              required
            />
            <TextField
              select
              id='situacao' // obrigatorio
              label='Situação' // obrigatorio
              size='small'
              fullWidth
              disabled={DISABILITAR_CAMPOS}
              placeholder='Situação'
              value={Situacao}
              onChange={(event) => {
                const value = event.target.value as string;
                setSituacao(value);
              }}
            >
              <MenuItem value={'Ativo'}>Ativo</MenuItem>
              <MenuItem value={'Inativo'}>Inativo</MenuItem>
            </TextField>
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

export default DepartamentosEditar;
