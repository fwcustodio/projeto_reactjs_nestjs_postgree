/*eslint no-useless-escape: 0*/

import React, { useState, useEffect, useContext, forwardRef } from 'react';
import { Box, Button, Container, IconButton, Typography, FormLabel, TextField, MenuItem } from '@mui/material';

import { FONT_SIZE, MODOS, MENSAGENS, validarCNPJ, getNomeFormatado } from '../../utils';
import { ROUTES } from '../../routes';

import ContainerPainel from '../../components/container_painel';
import AuthContext from '../../contexts/auth';
import { BoxPrincipal, BoxBotoes } from '../../components/form_box';
import Loading from '../../components/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrgaoEmpresa, cadastrarOrgaoEmpresa, alterarOrgaoEmpresa, excluirOrgaoEmpresa } from '../../api';
import { BotaoSalvar, BotaoExcluir, BotaoFechar, BotaoEditar } from '../../components/botoes';
import InputText from '../../components/input_dados';

const OrgaosEmpresasEditar: React.FC = (props) => {
  const { addMensagem }: { addMensagem?: (mensagem: string) => void } = useContext(AuthContext) || {
    addMensagem: (mensagem: string) => {},
  };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [LoadingInicio, setLoadingInicio] = useState(true);

  const { id, modo }: { id?: string; modo?: string } = useParams();
  const [OrgaoEmpresa, setOrgaoEmpresa] = useState<any>({});
  const [Nome, setNome] = useState<string>('');
  const [CNPJ, setCNPJ] = useState<string>('');
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
      const OrgaoEmpresaAux = await getOrgaoEmpresa(id);
      setOrgaoEmpresa(OrgaoEmpresaAux);
      //console.log('OrgaoEmpresa', JSON.stringify(OrgaoEmpresaAux));

      if (OrgaoEmpresaAux) {
        const { nome, cnpj, situacao } = OrgaoEmpresaAux;

        setNome(nome);
        setCNPJ(cnpj);
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

    if (!CNPJ || CNPJ.trim() == '') {
      alert(`CNPJ ${MENSAGENS.PREENCHIMENTO_OBRIGATORIO}`);
      return false;
    }

    const RegexCNPJ = new RegExp(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/);
    if (!RegexCNPJ.test(CNPJ) || !validarCNPJ(CNPJ)) {
      alert('O CNPJ informado é inválido');
      return false;
    }

    return true;
  };

  const salvarDados = async () => {
    if (!validarDados()) return;
    setLoading(true);

    const Dados = {
      nome: getNomeFormatado(Nome),
      cnpj: CNPJ.replace(/[^0-9]/g, ''),
      situacao: Situacao,
    };

    let Resp;

    switch (modo) {
      case MODOS.CADASTRAR:
        Resp = await cadastrarOrgaoEmpresa(Dados);
        break;
      case MODOS.ALTERAR:
        Resp = await alterarOrgaoEmpresa(Dados, id ?? '');
        break;
    }

    setLoading(false);

    if (Resp && Resp.Status == 'OK') {
      addMensagem(modo == MODOS.CADASTRAR ? MENSAGENS.REGISTRO_CADASTRADO_SUCESSO : MENSAGENS.REGISTRO_ALTERADO_SUCESSO);

      navigate(ROUTES.ORGAOS_EMPRESAS);
    } else if (Resp) {
      alert(Resp.Mensagem);
    }
  };

  const excluirRegistro = async () => {
    if (!confirm(MENSAGENS.EXCLUIR_REGISTRO)) return;
    setLoading(true);

    const Resp = await excluirOrgaoEmpresa(id ?? '');

    setLoading(false);

    if (Resp && Resp.Status == 'OK') {
      addMensagem(MENSAGENS.REGISTRO_EXCLUIDO_SUCESSO);
      navigate(ROUTES.ORGAOS_EMPRESAS);
    } else if (Resp) {
      alert(Resp.Mensagem);
    }
  };

  const editarRegistro = async () => {
    navigate(`${ROUTES.ORGAOS_EMPRESAS}/${id}/${MODOS.ALTERAR}`);
  };

  return (
    <ContainerPainel modo={modo} pagina_acima={'Orgãos / Empresas'} link_pagina_acima={ROUTES.ORGAOS_EMPRESAS}>
      <BoxPrincipal>
        {!LoadingInicio && (
          <>
            <InputText id='id' variant='outlined' disabled label='Código' value={id} size='small' />
            <InputText
              id='nome'
              label='Nome'
              value={Nome}
              onChange={(event: { target: { value: string } }) => setNome(event.target.value)}
              variant='outlined'
              size='small'
              fullWidth
              required
              disabled={DISABILITAR_CAMPOS}
            />

            <InputText
              id='cnpj'
              label='CNPJ'
              value={CNPJ}
              onChange={(event: { target: { value: string } }) => setCNPJ(event.target.value)}
              mask='99.999.999/9999-99'
              variant='outlined'
              size='small'
              fullWidth
              required
              disabled={DISABILITAR_CAMPOS}
            />

            <InputText
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
            </InputText>
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

export default OrgaosEmpresasEditar;
