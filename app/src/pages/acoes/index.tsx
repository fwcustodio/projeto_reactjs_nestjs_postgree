import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Container, IconButton, Typography, FormLabel, TextField } from '@mui/material';
import { FONT_SIZE, MODOS } from '../../utils';

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
import { getAcoes } from '../../api';

const Acoes: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const [TextoBusca, setTextoBusca] = useState<string>('');
  const [Acoes, setAcoes] = useState<Array<object>>([]);

  const [TotalRegistros, setTotalRegistros] = useState(0);
  const [PaginationModel, setPaginationModel] = React.useState<any>(PaginationModelDefault);

  useEffect(() => {
    carregarDados();
    return () => {};
  }, []);

  const carregarDados = async (TextoBuscaParm = TextoBusca, PaginationModelParm = PaginationModel) => {
    //console.log('carregarDados : ' + JSON.stringify(PaginationModelParm));
    const Resp = await getAcoes(TextoBuscaParm, PaginationModelParm);

    if (Resp) {
      setAcoes(Resp.dados);
      setTotalRegistros(Resp.total_registros);

      //console.log('Resp.dados', JSON.stringify(Resp.dados));
      //console.log('Resp.total_registros', JSON.stringify(Resp.total_registros));
    }

    setIsLoading(false);
  };

  const filtrarGrid = (Texto: string): void => {
    setTextoBusca(Texto);
    resetGrid(Texto, PaginationModel);
  };

  const onPaginationModelChange = (PaginationModelParm: any) => {
    //console.log('PaginationModelParm : ' + JSON.stringify(PaginationModelParm));
    setPaginationModel(PaginationModelParm);
    carregarDados(TextoBusca, PaginationModelParm);
  };

  const resetGrid = (Texto: string, PaginationModelParm: any) => {
    let PaginationModelAux = PaginationModelParm ?? PaginationModel;
    PaginationModelAux = { ...PaginationModelAux, page: 0 };
    setPaginationModel(PaginationModelAux);
    carregarDados(Texto, PaginationModelAux);
    //console.log('PaginationModelParm : ' + JSON.stringify(Pagination
  };

  const COLUNAS_FUNCIONALIDADE: GridColunas[] = [
    {
      field: 'nome',
      headerName: 'Nome',
      width: 650,
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
    pagina: ROUTES.ACOES,
    consultar: true,
    editar: true,
    excluir: true,
  };

  return (
    <ContainerPainel pagina={'Acões'}>
      <BoxPrincipal>
        <BoxSuperior>
          <BarraPesquisar filtrarGrid={filtrarGrid} />
          <BotaoAdicionar pagina={ROUTES.ACOES} />
        </BoxSuperior>
        <BoxGrid>
          <Grid
            columns={COLUNAS_FUNCIONALIDADE}
            rows={Acoes}
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

export default Acoes;
