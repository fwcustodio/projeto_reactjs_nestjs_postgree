import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Container, IconButton, Typography, FormLabel, TextField, MenuItem, Divider } from '@mui/material';

import { FONT_SIZE, MODOS, MENSAGENS, getNomeFormatado } from '../../utils';
import { ROUTES } from '../../routes';

import ContainerPainel from '../../components/container_painel';
import AuthContext from '../../contexts/auth';
import { BoxPrincipal, BoxBotoes } from '../../components/form_box';
import Loading from '../../components/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { getPerfil, cadastrarPerfil, alterarPerfil, excluirPerfil } from '../../api';
import { getFuncionalidadesAtivas } from '../../api';
import { BotaoSalvar, BotaoExcluir, BotaoFechar, BotaoEditar } from '../../components/botoes';
import InputDados from '../../components/input_dados';
import FuncionalidadesAcoes from '../../components/funcionalidades_acoes';

const PerfisEditar: React.FC = (props) => {
  const { addMensagem }: { addMensagem?: (mensagem: string) => void } = useContext(AuthContext) || {
    addMensagem: (mensagem: string) => {},
  };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [LoadingInicio, setLoadingInicio] = useState(true);

  const { id, modo }: { id?: string; modo?: string } = useParams();
  const [Perfil, setPerfil] = useState<any>({});
  const [Funcionalidades, setFuncionalidades] = useState<any>({});
  const [Nome, setNome] = useState<string>('');
  const [Descricao, setDescricao] = useState<string | null>(null);
  const [Situacao, setSituacao] = useState<string>('Ativo');
  const [FuncionalidadesSelecionadas, setFuncionalidadesSelecionadas] = useState([]);
  const DISABILITAR_CAMPOS = modo == MODOS.VISUALIZAR || modo == MODOS.EXCLUIR;

  useEffect(() => {
    //console.log('id', id);
    //console.log('modo', modo);

    carregarDados();
    return () => {};
  }, []);

  const carregarDados = async () => {
    if (id) {
      const PerfilAux = await getPerfil(id);
      setPerfil(PerfilAux);
      //console.log('Perfil', JSON.stringify(PerfilAux));

      if (PerfilAux) {
        const { nome, descricao, situacao } = PerfilAux;

        setNome(nome);
        setDescricao(descricao);
        setFuncionalidadesSelecionadas(PerfilAux.funcionalidades);
        setSituacao(situacao);
      }
    }

    const FuncionalidadesAux = await getFuncionalidadesAtivas();
    setFuncionalidades(FuncionalidadesAux);

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

    const FuncionalidadesAux = FuncionalidadesSelecionadas.filter((item: any) => item.funcionalidade_id != 0);
    // Remove os campos vazios do componente de funcionalidades

    const Dados = {
      nome: getNomeFormatado(Nome),
      descricao: Descricao,
      situacao: Situacao,
      funcionalidades: FuncionalidadesAux,
    };

    let Resp;

    switch (modo) {
      case MODOS.CADASTRAR:
        Resp = await cadastrarPerfil(Dados);
        break;
      case MODOS.ALTERAR:
        Resp = await alterarPerfil(Dados, id ?? '');
        break;
    }

    setLoading(false);

    if (Resp && Resp.Status == 'OK') {
      addMensagem(modo == MODOS.CADASTRAR ? MENSAGENS.REGISTRO_CADASTRADO_SUCESSO : MENSAGENS.REGISTRO_ALTERADO_SUCESSO);

      navigate(ROUTES.PERFIS);
    } else if (Resp) {
      alert(Resp.Mensagem);
    }
  };

  const excluirRegistro = async () => {
    if (!confirm(MENSAGENS.EXCLUIR_REGISTRO)) return;
    setLoading(true);

    const Resp = await excluirPerfil(id ?? '');

    setLoading(false);

    if (Resp && Resp.Status == 'OK') {
      addMensagem(MENSAGENS.REGISTRO_EXCLUIDO_SUCESSO);
      navigate(ROUTES.PERFIS);
    } else if (Resp) {
      alert(Resp.Mensagem);
    }
  };

  const editarRegistro = async () => {
    navigate(`${ROUTES.PERFIS}/${id}/${MODOS.ALTERAR}`);
  };

  return (
    <ContainerPainel modo={modo} pagina_acima={'Perfis'} link_pagina_acima={ROUTES.PERFIS}>
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
              id='descricao'
              label='Descricao'
              value={Descricao}
              onChange={(event: { target: { value: string } }) => setDescricao(event.target.value)}
              multiline={true}
              variant='outlined'
              size='small'
              fullWidth
              disabled={DISABILITAR_CAMPOS}
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

            <Divider style={{ marginTop: 15, marginBottom: 15, color: 'grey' }}>FUNCIONALIDADES</Divider>

            <FuncionalidadesAcoes
              FuncionalidadesDisponiveis={Funcionalidades}
              FuncionalidadesSelecionadas={FuncionalidadesSelecionadas}
              setFuncionalidadesSelecionadas={setFuncionalidadesSelecionadas}
              DISABILITAR_CAMPOS={DISABILITAR_CAMPOS}
            />

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

export default PerfisEditar;
