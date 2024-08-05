import * as React from 'react';
import { Box, Paper, InputBase, IconButton } from '@mui/material';
import { FONT_SIZE, MODOS } from '../../utils';

import { useNavigate } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; // Add this import statement
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { set } from 'react-hook-form';

interface OPCOES_FUNCIONALIDADE {
  pagina: string;
  consultar?: boolean;
  editar?: boolean;
  excluir?: boolean;
}

interface PaginationModel {
  page: number;
  pageSize: number;
}

interface GridProps {
  columns: GridColDef[];
  rows: any[]; // Replace `any` with the appropriate type for your rows
  OPCOES_FUNCIONALIDADE?: OPCOES_FUNCIONALIDADE; // Adjusted the type
  TotalRegistros: number;
  isLoading: boolean;
  PaginationModel: PaginationModel;
  setPaginationModel: (parm: PaginationModel) => void; // Add the parameter type
}

const Grid: React.FC<GridProps> = (props) => {
  const { columns, rows, OPCOES_FUNCIONALIDADE, TotalRegistros, isLoading, PaginationModel, setPaginationModel } = props;
  const navigate = useNavigate();

  // Opções consultar, editar e excluir
  if (OPCOES_FUNCIONALIDADE) {
    if (OPCOES_FUNCIONALIDADE.consultar || OPCOES_FUNCIONALIDADE.editar || OPCOES_FUNCIONALIDADE.excluir) {
      columns.push({
        field: 'Opções',
        headerName: '',
        align: 'right',
        flex: 1,
        minWidth: 170,
        renderCell: (params: GridRenderCellParams<any, Date>) => (
          <Box flex={1} display={'flex'} justifyContent={'flex-end'}>
            {OPCOES_FUNCIONALIDADE.consultar && (
              <Box bgcolor={'secondary.main'} style={{ borderRadius: '50%', width: 30, height: 30, margin: 6 }}>
                <IconButton
                  style={{ padding: 0, margin: 0, paddingRight: 3, marginTop: -5 }}
                  onClick={() => {
                    navigate(`${OPCOES_FUNCIONALIDADE.pagina}/${params.row.id}/${MODOS.VISUALIZAR}`);
                  }}
                >
                  <VisibilityOutlinedIcon fontSize='medium' style={{ color: 'white', marginBottom: 5, paddingBottom: 5 }} />
                </IconButton>
              </Box>
            )}
            {OPCOES_FUNCIONALIDADE.editar && (
              <Box bgcolor={'primary.main'} style={{ borderRadius: '50%', width: 30, height: 30, margin: 6 }}>
                <IconButton
                  style={{ padding: 0, margin: 0, paddingRight: 3, marginTop: -5 }}
                  onClick={() => {
                    navigate(`${OPCOES_FUNCIONALIDADE.pagina}/${params.row.id}/${MODOS.ALTERAR}`);
                  }}
                >
                  <ModeEditOutlinedIcon fontSize='medium' style={{ color: 'white', marginBottom: 5, paddingBottom: 5 }} />
                </IconButton>
              </Box>
            )}
            {OPCOES_FUNCIONALIDADE.excluir && (
              <Box bgcolor={'error.main'} style={{ borderRadius: '50%', width: 30, height: 30, margin: 6 }}>
                <IconButton
                  style={{ padding: 0, margin: 0, paddingRight: 3, marginTop: -5 }}
                  onClick={() => {
                    navigate(`${OPCOES_FUNCIONALIDADE.pagina}/${params.row.id}/${MODOS.EXCLUIR}`);
                  }}
                >
                  <DeleteOutlineIcon fontSize='medium' style={{ color: 'white', marginBottom: 5, paddingBottom: 5 }} />
                </IconButton>
              </Box>
            )}
          </Box>
        ),
      });
    }
  }

  const onPaginationModelChange = (PaginationModelParm: any) => {
    if (PaginationModel && PaginationModelParm.pageSize !== PaginationModel.pageSize) {
      setPaginationModel({ ...PaginationModelParm, page: 0 }); //zerando a paginação
    } else {
      setPaginationModel(PaginationModelParm);
    }
    //console.log('PaginationModelParm : ' + JSON.stringify(PaginationModelParm));
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
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
      rowCount={TotalRegistros}
      loading={isLoading}
      paginationModel={PaginationModel}
      pageSizeOptions={[10, 20, 50, 100]}
      paginationMode='server'
      onPaginationModelChange={(parm) => onPaginationModelChange(parm)}
      rowHeight={45}
      localeText={{
        noRowsLabel: 'Nenhum registro encontrado',
        MuiTablePagination: { labelDisplayedRows: ({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}` },
      }}
      //paginationMeta={hasNextPage={true}}
      //disableColumnResize={true}
      //sx={{ '': }}
    />
  );
};

export const PaginationModelDefault = { page: 0, pageSize: 10 };

export default Grid;
