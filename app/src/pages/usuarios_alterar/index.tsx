import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Container, IconButton, Typography, FormLabel, TextField, MenuItem, Divider } from '@mui/material';

import { FONT_SIZE, MODOS, MENSAGENS, validarCPF, ucFirstAllWords, getNomeFormatado, validarEmail } from '../../utils';
import { ROUTES } from '../../routes';

import ContainerPainel from '../../components/container_painel';
import AuthContext from '../../contexts/auth';
import { BoxPrincipal, BoxBotoes } from '../../components/form_box';
import { BoxGrid } from '../../components/grid_box';
import Loading from '../../components/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { getCombosUsuarios, getUsuario, cadastrarUsuario, alterarUsuario, excluirUsuario } from '../../api';
import { BotaoSalvar, BotaoExcluir, BotaoFechar, BotaoEditar } from '../../components/botoes';
import InputDados from '../../components/input_dados';
import { DataGrid, GridColDef as GridColunas, GridRenderCellParams } from '@mui/x-data-grid';
import { PaginationModelDefault } from '../../components/grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FuncionalidadesAcoes from '../../components/funcionalidades_acoes';

const UsuariosEditar: React.FC = (props) => {
  const { addMensagem }: { addMensagem?: (mensagem: string) => void } = useContext(AuthContext) || {
    addMensagem: (mensagem: string) => {},
  };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [LoadingInicio, setLoadingInicio] = useState(true);

  const { id, modo }: { id?: string; modo?: string } = useParams();
  const [Usuario, setUsuario] = useState<any>({});
  const [Nome, setNome] = useState<string>('');
  const [CPF, setCPF] = useState<string>('');
  const [Email, setEmail] = useState<string | null>(null);
  const [Matricula, setMatricula] = useState<string | null>(null);
  const [OrgaoSelecionado, setOrgaoSelecionado] = useState<string | null>(null);
  const [DepartamentoSelecionado, setDepartamentoSelecionado] = useState<string | null>(null);
  const [TipoServidorSelecionado, setTipoServidorSelecionado] = useState<string | null>(null);

  const [OrgaosDisponiveis, setOrgaosDisponiveis] = useState<any>([]);
  const [DepartamentosDisponiveis, setDepartamentosDisponiveis] = useState<any>([]);
  const [TiposServidoresDisponiveis, setTiposServidoresDisponiveis] = useState<any>([]);
  const [PerfilCampoAux, setPerfilCampoAux] = useState<string | null>(null);
  const [FuncionalidadeCampoAux, setFuncionalidadeCampoAux] = useState<string | null>(null);
  const [PerfisAcessoDisponiveis, setPerfisAcessoDisponiveis] = useState<any>([]);
  const [PerfisAcessoSelecionados, setPerfisAcessoSelecionados] = useState<any>([]);
  const [FuncionalidadesDisponiveis, setFuncionalidadesDisponiveis] = useState<any>([]);
  const [FuncionalidadesSelecionadas, setFuncionalidadesSelecionadas] = useState<any>([]);
  const [Situacao, setSituacao] = useState<string>('Ativo');
  const [RegistroPodeSerExcluido, setRegistroPodeSerExcluido] = useState<boolean>(false);

  const DISABILITAR_CAMPOS = modo == MODOS.VISUALIZAR || modo == MODOS.EXCLUIR;

  useEffect(() => {
    //console.log('id', id);
    //console.log('modo', modo);

    carregarDados();
    return () => {};
  }, []);

  const carregarDados = async () => {
    const DadosCombos = await getCombosUsuarios();
    if (DadosCombos) {
      setOrgaosDisponiveis(DadosCombos.orgaos);
      setDepartamentosDisponiveis(DadosCombos.departamentos);
      setTiposServidoresDisponiveis(DadosCombos.tipos_servidores);
      setPerfisAcessoDisponiveis(DadosCombos.perfis);
      setFuncionalidadesDisponiveis(DadosCombos.funcionalidades);
    }

    if (id) {
      const UsuarioAux = await getUsuario(id);
      setUsuario(UsuarioAux);
      //console.log('Usuario', JSON.stringify(UsuarioAux));

      if (UsuarioAux) {
        const { nome, cpf, email, matricula, orgao_id, departamento_id, tipo_servidor_id, situacao, perfis, funcionalidades_acoes } = UsuarioAux;

        setNome(nome);
        setCPF(cpf);
        setEmail(email);
        setMatricula(matricula);
        setOrgaoSelecionado(orgao_id);
        setDepartamentoSelecionado(departamento_id);
        setTipoServidorSelecionado(tipo_servidor_id);
        setSituacao(situacao);

        setPerfisAcessoSelecionados(perfis ?? []);
        setFuncionalidadesSelecionadas(funcionalidades_acoes ?? []);
      }
    }

    setLoadingInicio(false);
    setLoading(false);
  };

  const validarDados = () => {
    if (!Nome || Nome.trim() == '') {
      alert(`Nome ${MENSAGENS.PREENCHIMENTO_OBRIGATORIO}`);
      return false;
    } else {
      const NomeAux = getNomeFormatado(Nome);
      if (!NomeAux || NomeAux.trim() == '') {
        alert(`Nome ${MENSAGENS.PREENCHIMENTO_INVALIDO}`);
        return false;
      }
    }

    if (!CPF || CPF.trim() == '') {
      alert(`CPF ${MENSAGENS.PREENCHIMENTO_OBRIGATORIO}`);
      return false;
    } else {
      const RegexCPF = new RegExp(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/);
      if (!RegexCPF.test(CPF) || !validarCPF(CPF)) {
        alert(`CPF ${MENSAGENS.PREENCHIMENTO_INVALIDO}`);
        return false;
      }
    }

    if (Email) {
      if (!validarEmail(Email)) {
        alert(`Email ${MENSAGENS.PREENCHIMENTO_INVALIDO}`);
        return false;
      }
    }

    return true;
  };

  const salvarDados = async () => {
    if (!validarDados()) return;
    setLoading(true);

    const FuncionalidadesAux = FuncionalidadesSelecionadas.filter((item: any) => item.funcionalidade_id != 0);

    const er = /[^a-z0-9]/gi;

    const Dados = {
      nome: ucFirstAllWords(getNomeFormatado(Nome, false)),
      cpf: CPF.replace(/[^0-9]/g, ''),
      email: Email ? Email.toLowerCase().trim() : null,
      matricula: Matricula,
      orgao_id: OrgaoSelecionado && OrgaoSelecionado != '-1' ? OrgaoSelecionado : null,
      departamento_id: DepartamentoSelecionado && DepartamentoSelecionado != '-1' ? DepartamentoSelecionado : null,
      tipo_servidor_id: TipoServidorSelecionado && TipoServidorSelecionado != '-1' ? TipoServidorSelecionado : null,
      situacao: Situacao,
      perfis: PerfisAcessoSelecionados,
      funcionalidades_acoes: FuncionalidadesAux,
    };

    let Resp;

    switch (modo) {
      case MODOS.CADASTRAR:
        Resp = await cadastrarUsuario(Dados);
        break;
      case MODOS.ALTERAR:
        Resp = await alterarUsuario(Dados, id ?? '');
        break;
      case MODOS.EXCLUIR:
        Resp = await alterarUsuario(Dados, id ?? '');
        break;
    }

    setLoading(false);

    if (Resp && Resp.Status == 'OK') {
      addMensagem(modo == MODOS.CADASTRAR ? MENSAGENS.REGISTRO_CADASTRADO_SUCESSO : MENSAGENS.REGISTRO_ALTERADO_SUCESSO);

      navigate(ROUTES.USUARIOS);
    } else if (Resp) {
      alert(Resp.Mensagem);
    }
  };

  const excluirRegistro = async () => {
    if (!confirm(MENSAGENS.EXCLUIR_REGISTRO)) return;
    setLoading(true);

    const Resp = await excluirUsuario(id ?? '');

    setLoading(false);

    if (Resp && Resp.Status == 'OK') {
      addMensagem(MENSAGENS.REGISTRO_EXCLUIDO_SUCESSO);
      navigate(ROUTES.USUARIOS);
    } else if (Resp) {
      alert(Resp.Mensagem);
    }
  };

  const editarRegistro = async () => {
    navigate(`${ROUTES.USUARIOS}/${id}/${MODOS.ALTERAR}`);
  };

  const COLUNAS: GridColunas[] = [
    {
      field: 'nome',
      headerName: 'Perfil',
      width: 250,
    },

    {
      field: 'situacao',
      headerName: 'Situação',
      //description: 'Situação',
      width: 150,
      //valueGetter: (value, row) => `${row.status == 'Aitvo' || ''} ${row.descricao || ''}`,
    },
    {
      field: 'Opções',
      headerName: '',
      align: 'right',
      flex: 1,
      minWidth: 170,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <Box flex={1} display={'flex'} justifyContent={'flex-end'}>
          <Box bgcolor={'error.main'} style={{ borderRadius: '50%', width: 30, height: 30, margin: 6 }}>
            <IconButton
              style={{ padding: 0, margin: 0, paddingRight: 3, marginTop: -5 }}
              onClick={() => {
                const PerfisAcessoSelecionadosAux = PerfisAcessoSelecionados.filter((item: any) => item.id != params.row.id);
                setPerfisAcessoSelecionados(PerfisAcessoSelecionadosAux);
              }}
              disabled={DISABILITAR_CAMPOS}
            >
              <DeleteOutlineIcon fontSize='medium' style={{ color: 'white', marginBottom: 5, paddingBottom: 5 }} />
            </IconButton>
          </Box>
        </Box>
      ),
    },
  ];

  const adicionarPerfil = () => {
    if (!PerfilCampoAux || PerfilCampoAux == '-1') {
      alert('Selecione um perfil');
      return;
    }

    const PerfilSelecionado = PerfisAcessoDisponiveis.find((item: any) => item.id == PerfilCampoAux);
    setPerfilCampoAux(null);

    if (PerfilSelecionado) {
      if (PerfisAcessoSelecionados.find((item: any) => item.id == PerfilSelecionado.id)) {
        alert('Perfil já adicionado');
        return;
      }

      setPerfisAcessoSelecionados([...PerfisAcessoSelecionados, PerfilSelecionado]);
    }
  };

  return (
    <ContainerPainel modo={modo} pagina_acima={'Usuários'} link_pagina_acima={ROUTES.USUARIOS}>
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
              disabled={DISABILITAR_CAMPOS}
              required
            />

            <InputDados
              id='cpf'
              label='CPF'
              value={CPF}
              mask='999.999.999-99'
              onChange={(event: { target: { value: string } }) => setCPF(event.target.value)}
              variant='outlined'
              disabled={DISABILITAR_CAMPOS}
              required
            />

            <InputDados
              id='email'
              label='Email'
              value={Email}
              onChange={(event: { target: { value: string } }) => setEmail(event.target.value)}
              variant='outlined'
              disabled={DISABILITAR_CAMPOS}
            />
            <InputDados
              id='matricula'
              label='Matricula'
              value={Matricula}
              onChange={(event: { target: { value: string } }) => setMatricula(event.target.value)}
              variant='outlined'
              fullWidth
              mask={'999999999999'}
              disabled={DISABILITAR_CAMPOS}
            />

            <InputDados
              select
              id='tipo_servidor' // obrigatorio
              label='Tipo de Servidor' // obrigatorio
              placeholder='Tipo de Servidor'
              value={TipoServidorSelecionado}
              onChange={(event: { target: { value: string } }) => {
                setTipoServidorSelecionado(event.target.value);
              }}
              fullWidth
              disabled={DISABILITAR_CAMPOS}
            >
              <MenuItem key={'-1'} value={'-1'}>
                {'Selecione ...'}
              </MenuItem>
              {TiposServidoresDisponiveis &&
                TiposServidoresDisponiveis.map((item: any) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nome}
                  </MenuItem>
                ))}
            </InputDados>

            <InputDados
              select
              id='departamento' // obrigatorio
              label='Departamento' // obrigatorio
              placeholder='Departamento'
              value={DepartamentoSelecionado}
              onChange={(event: { target: { value: string } }) => {
                setDepartamentoSelecionado(event.target.value);
              }}
              fullWidth
              disabled={DISABILITAR_CAMPOS}
            >
              <MenuItem key={'-1'} value={'-1'}>
                {'Selecione ...'}
              </MenuItem>

              {DepartamentosDisponiveis &&
                DepartamentosDisponiveis.map((item: any) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nome}
                  </MenuItem>
                ))}
            </InputDados>

            <InputDados
              select
              id='orago' // obrigatorio
              label='Órgãos/Empresas' // obrigatorio
              placeholder='Órgãos/Empresas'
              value={OrgaoSelecionado}
              onChange={(event: { target: { value: string } }) => {
                setOrgaoSelecionado(event.target.value);
              }}
              fullWidth
              disabled={DISABILITAR_CAMPOS}
            >
              <MenuItem key={'-1'} value={'-1'}>
                {'Selecione ...'}
              </MenuItem>
              {OrgaosDisponiveis &&
                OrgaosDisponiveis.map((item: any) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nome}
                  </MenuItem>
                ))}
            </InputDados>

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
              disabled={MODOS.VISUALIZAR == modo}
            >
              <MenuItem value={'Ativo'}>Ativo</MenuItem>
              <MenuItem value={'Inativo'}>Inativo</MenuItem>
            </InputDados>

            <Divider style={{ marginTop: 20, marginBottom: 20, color: 'grey' }}>PERFIS DE ACESSO</Divider>

            <Box>
              <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
                <InputDados
                  select
                  id='perfil' // obrigatorio
                  label='Perfil' // obrigatorio
                  placeholder='Perfil'
                  value={PerfilCampoAux}
                  onChange={(event: { target: { value: string } }) => {
                    setPerfilCampoAux(event.target.value);
                  }}
                  fullWidth
                  disabled={DISABILITAR_CAMPOS}
                >
                  <MenuItem key={'-1'} value={'-1'}>
                    {'Selecione ...'}
                  </MenuItem>
                  {PerfisAcessoDisponiveis &&
                    PerfisAcessoDisponiveis.map((item: any) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nome}
                      </MenuItem>
                    ))}
                </InputDados>

                <Box>
                  <Button
                    variant='contained'
                    style={{ backgroundColor: '#109fef' }}
                    onClick={adicionarPerfil}
                    sx={{ marginLeft: 10, marginRight: '30%' }}
                    disabled={DISABILITAR_CAMPOS}
                  >
                    Adicionar
                  </Button>
                </Box>
              </Box>
              <BoxGrid>
                <DataGrid
                  rows={PerfisAcessoSelecionados}
                  columns={COLUNAS}
                  initialState={{}}
                  //checkboxSelection
                  disableRowSelectionOnClick
                  disableVirtualization={true}
                  disableColumnFilter={true}
                  disableColumnMenu={true}
                  disableColumnSelector={true}
                  autoHeight={true}
                  slotProps={{
                    pagination: {
                      labelRowsPerPage: 'Linhas por página',
                    },
                  }}
                  pageSizeOptions={[10, 20, 50]}
                  rowHeight={45}
                  localeText={{
                    noRowsLabel: 'Nenhum registro selecionado',
                  }}
                />
              </BoxGrid>
            </Box>

            <Divider style={{ marginTop: 20, marginBottom: 20, color: 'grey' }}>CONFIGURAÇÕES ADICIONAIS DE PERMISSÕES</Divider>

            <FuncionalidadesAcoes
              FuncionalidadesDisponiveis={FuncionalidadesDisponiveis}
              FuncionalidadesSelecionadas={FuncionalidadesSelecionadas}
              setFuncionalidadesSelecionadas={setFuncionalidadesSelecionadas}
              DISABILITAR_CAMPOS={DISABILITAR_CAMPOS}
            />

            <BoxBotoes sx={{ marginTop: 15 }}>
              {(MODOS.ALTERAR == modo || MODOS.CADASTRAR == modo || (MODOS.EXCLUIR == modo && !RegistroPodeSerExcluido)) && (
                <BotaoSalvar onClick={salvarDados} />
              )}
              {MODOS.EXCLUIR == modo && <BotaoExcluir onClick={excluirRegistro} disabled={!RegistroPodeSerExcluido} />}
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

export default UsuariosEditar;
