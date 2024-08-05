import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Container, IconButton, Typography, FormLabel, TextField, MenuItem } from '@mui/material';
import { FONT_SIZE, MODOS, getCPFFormatado } from '../../utils';

import ContainerPainel from '../../components/container_painel';
import AuthContext from '../../contexts/auth';
import { ROUTES } from '../../routes';

import { BotaoAdicionar } from '../../components/botoes';
import BarraPesquisar from '../../components/grid_pesquisar';

import Grid from '../../components/grid';
import { PaginationModelDefault } from '../../components/grid';

import Loading from '../../components/loading';

import { BoxPrincipal, BoxSuperior, BoxGrid } from '../../components/grid_box';

import { GridColDef as GridColunas } from '@mui/x-data-grid';
import { getUsuarios, getPerfisAtivos } from '../../api';
import StatusPesquisar from '../../components/status_pesquisar';
import InputDados from '../../components/input_dados';

const Usuarios: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [TextoBusca, setTextoBusca] = useState<string | null>(null);
  const [StatusBusca, setStatusBusca] = useState<string | null>(null);
  const [PerfilBusca, setPerfilBusca] = useState<string | null>(null);

  const [Usuarios, setUsuarios] = useState<Array<object>>([]);
  const [Perfis, setPerfis] = useState<any | null>(null);

  const [TotalRegistros, setTotalRegistros] = useState(0);
  const [PaginationModel, setPaginationModel] = React.useState<any>(PaginationModelDefault);

  useEffect(() => {
    carregarDados();
    return () => {};
  }, []);

  const carregarDados = async (
    TextoBuscaParm = TextoBusca,
    StatusBuscaParm = StatusBusca,
    PerfilBuscaParm = PerfilBusca,
    PaginationModelParm = PaginationModel,
  ) => {
    //console.log('carregarDados : ' + JSON.stringify(PaginationModelParm));
    const Resp = await getUsuarios(TextoBuscaParm, StatusBuscaParm, PerfilBuscaParm, PaginationModelParm);

    if (!Perfis) {
      const PerfisAux = await getPerfisAtivos();
      setPerfis(PerfisAux);
    }

    //console.log('PerfisAux', JSON.stringify(PerfisAux));

    if (Resp) {
      setUsuarios(Resp.dados);
      setTotalRegistros(Resp.total_registros);

      //console.log('Resp.dados', JSON.stringify(Resp.dados));
      //console.log('Resp.total_registros', JSON.stringify(Resp.total_registros));
    }

    setIsLoading(false);
  };

  const filtrarGrid = (Texto = TextoBusca, Status = StatusBusca, Perfil = PerfilBusca): void => {
    setStatusBusca(Status);
    setTextoBusca(Texto);
    setPerfilBusca(Perfil);
    resetGrid(Texto, Status, Perfil, PaginationModel);
  };

  const onPaginationModelChange = (PaginationModelParm: any) => {
    //console.log('PaginationModelParm : ' + JSON.stringify(PaginationModelParm));
    setPaginationModel(PaginationModelParm);
    carregarDados(TextoBusca, StatusBusca, PerfilBusca, PaginationModelParm);
  };

  const resetGrid = (Texto: string | null, Status: string | null, Perfil: string | null, PaginationModelParm: any) => {
    let PaginationModelAux = PaginationModelParm ?? PaginationModel;
    PaginationModelAux = { ...PaginationModelAux, page: 0 };
    setPaginationModel(PaginationModelAux);
    carregarDados(Texto, Status, Perfil, PaginationModelAux);
    //console.log('PaginationModelParm : ' + JSON.stringify(Pagination
  };

  const COLUNAS_FUNCIONALIDADE: GridColunas[] = [
    {
      field: 'nome',
      headerName: 'Nome',
      width: 400,
    },

    {
      field: 'email',
      headerName: 'Email',
      width: 300,
    },

    {
      field: 'cpf',
      headerName: 'CPF',
      width: 150,
      valueGetter: (value, row) => `${getCPFFormatado(value)}`,
    },

    {
      field: 'situacao',
      headerName: 'Situação',
      //description: 'Situação',
      width: 150,
      //valueGetter: (value, row) => `${row.status == 'Aitvo' || ''} ${row.descricao || ''}`,
    },
  ];

  const OPCOES_FUNCIONALIDADE = {
    pagina: ROUTES.USUARIOS,
    consultar: true,
    editar: true,
    excluir: true,
  };

  return (
    <ContainerPainel pagina={'Usuários'}>
      <BoxPrincipal>
        <BoxSuperior>
          <BarraPesquisar filtrarGrid={filtrarGrid} />
          <BotaoAdicionar pagina={ROUTES.USUARIOS} />
        </BoxSuperior>
        <StatusPesquisar StatusPesquisa={StatusBusca} filtrarGrid={filtrarGrid} />

        <Box p={2} pt={0} pl={0} sx={{ width: 300 }}>
          <InputDados
            select
            id='perfil' // obrigatorio
            label='Perfil' // obrigatorio
            placeholder='Perfil'
            value={PerfilBusca}
            onChange={(event: { target: { value: string } }) => {
              filtrarGrid(null, null, event.target.value);
            }}
            size='small'
            fullWidth
          >
            <MenuItem value={'-1'}>Selecione...</MenuItem>
            {Perfis &&
              Perfis.map((item: any) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nome}
                </MenuItem>
              ))}
          </InputDados>
        </Box>

        <BoxGrid>
          <Grid
            columns={COLUNAS_FUNCIONALIDADE}
            rows={Usuarios}
            OPCOES_FUNCIONALIDADE={OPCOES_FUNCIONALIDADE}
            TotalRegistros={TotalRegistros}
            isLoading={isLoading}
            PaginationModel={PaginationModel}
            setPaginationModel={onPaginationModelChange}
          />
        </BoxGrid>
      </BoxPrincipal>
    </ContainerPainel>
  );
};

export default Usuarios;
