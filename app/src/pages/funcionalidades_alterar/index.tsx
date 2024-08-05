import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Container, IconButton, Typography, FormLabel, TextField, MenuItem, Divider } from '@mui/material';
import { Delete } from '@mui/icons-material';

import { FONT_SIZE, MODOS, MENSAGENS, getNomeFormatado } from '../../utils';
import { ROUTES } from '../../routes';

import ContainerPainel from '../../components/container_painel';
import AuthContext from '../../contexts/auth';
import { BoxPrincipal, BoxBotoes } from '../../components/form_box';
import Loading from '../../components/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { getFuncionalidade, cadastrarFuncionalidade, alterarFuncionalidade, excluirFuncionalidade } from '../../api';
import { getAcoesAtivas } from '../../api';
import { BotaoSalvar, BotaoExcluir, BotaoFechar, BotaoEditar } from '../../components/botoes';
import InputDados from '../../components/input_dados';
import FuncionalidadesAcoes from '../../components/funcionalidades_acoes';
import { Add } from '@mui/icons-material';

const FuncionalidadesEditar: React.FC = (props) => {
  const { addMensagem }: { addMensagem?: (mensagem: string) => void } = useContext(AuthContext) || {
    addMensagem: (mensagem: string) => {},
  };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [LoadingInicio, setLoadingInicio] = useState(true);

  const { id, modo }: { id?: string; modo?: string } = useParams();
  const [Funcionalidade, setFuncionalidade] = useState<any>({});
  const [AcoesDisponiveis, setAcoesDisponiveis] = useState<any>([]);
  const [AcoesSelecionadas, setAcoesSelecionadas] = useState<any>([]);
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
    const AcoesAux = await getAcoesAtivas();
    setAcoesDisponiveis(AcoesAux);

    if (id) {
      const FuncionalidadeAux = await getFuncionalidade(id);
      setFuncionalidade(FuncionalidadeAux);
      //console.log('Funcionalidade', JSON.stringify(FuncionalidadeAux));

      if (FuncionalidadeAux) {
        const { nome, descricao, acoes, situacao } = FuncionalidadeAux;

        setNome(nome);
        setDescricao(descricao);
        setAcoesSelecionadas(acoes);
        setSituacao(situacao);
      }
    } else {
      setAcoesSelecionadas(AcoesAux);
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

    // Remove os campos vazios do componente de funcionalidades

    const Dados = {
      nome: getNomeFormatado(Nome),
      descricao: Descricao,
      acoes: AcoesSelecionadas,
      situacao: Situacao,
    };

    let Resp;

    switch (modo) {
      case MODOS.CADASTRAR:
        Resp = await cadastrarFuncionalidade(Dados);
        break;
      case MODOS.ALTERAR:
        Resp = await alterarFuncionalidade(Dados, id ?? '');
        break;
    }

    setLoading(false);

    if (Resp && Resp.Status == 'OK') {
      addMensagem(modo == MODOS.CADASTRAR ? MENSAGENS.REGISTRO_CADASTRADO_SUCESSO : MENSAGENS.REGISTRO_ALTERADO_SUCESSO);

      navigate(ROUTES.FUNCIONALIDADES);
    } else if (Resp) {
      alert(Resp.Mensagem);
    }
  };

  const excluirRegistro = async () => {
    if (!confirm(MENSAGENS.EXCLUIR_REGISTRO)) return;
    setLoading(true);

    const Resp = await excluirFuncionalidade(id ?? '');

    setLoading(false);

    if (Resp && Resp.Status == 'OK') {
      addMensagem(MENSAGENS.REGISTRO_EXCLUIDO_SUCESSO);
      navigate(ROUTES.FUNCIONALIDADES);
    } else if (Resp) {
      alert(Resp.Mensagem);
    }
  };

  const editarRegistro = async () => {
    navigate(`${ROUTES.FUNCIONALIDADES}/${id}/${MODOS.ALTERAR}`);
  };

  const removerAcao = (ID: string) => {
    console.log('AcoesSelecionadas', JSON.stringify(AcoesSelecionadas));

    const AcoesAtualizadas = AcoesSelecionadas.filter((Item: any) => Item.id != ID);
    setAcoesSelecionadas(AcoesAtualizadas);
  };

  return (
    <ContainerPainel modo={modo} pagina_acima={'Funcionalidades'} link_pagina_acima={ROUTES.FUNCIONALIDADES}>
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

            <Divider style={{ marginTop: 15, marginBottom: 0, color: 'grey' }}>AÇÕES</Divider>

            <Box mb={2} p={2} border={1} borderColor='grey.300' borderRadius={4}>
              <Box mt={2}>
                <Button
                  style={{ marginBottom: 20 }}
                  variant='outlined'
                  color='secondary'
                  startIcon={<Delete />}
                  onClick={() => setAcoesSelecionadas(AcoesDisponiveis)}
                  size='small'
                  disabled={DISABILITAR_CAMPOS}
                >
                  Resetar
                </Button>
              </Box>

              {AcoesSelecionadas &&
                AcoesSelecionadas.map((acao: { id: string; nome: string }, AcaoIndex: number) => (
                  <Box key={AcaoIndex} display='flex' alignItems='center' mb={1} mt={1}>
                    <InputDados
                      label='Ação'
                      value={acao.nome}
                      size='small'
                      variant='standard'
                      disabled={true}
                      inputProps={{ style: { fontSize: 14 } }}
                      //InputLabelProps={{ style: { fontSize: 14 } }}
                    />
                    {!DISABILITAR_CAMPOS && (
                      <IconButton onClick={() => removerAcao(acao.id)}>
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                ))}
            </Box>

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

export default FuncionalidadesEditar;
