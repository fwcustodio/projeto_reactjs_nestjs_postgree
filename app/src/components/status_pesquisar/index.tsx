import * as React from 'react';
import { Box, Paper, InputBase, IconButton, MenuItem } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import InputDados from '../input_dados';

interface GridPesquisarProps {
  StatusPesquisa: string | null;
  filtrarGrid: (Parm1: null, Parm: string) => void;
}

const StatusPesquisar: React.FC<GridPesquisarProps> = (props) => {
  const { StatusPesquisa, filtrarGrid } = props;

  return (
    <Box p={2} pl={0} sx={{ width: 150 }}>
      <InputDados
        select
        id='situacao' // obrigatorio
        label='Situação' // obrigatorio
        placeholder='Situação'
        value={StatusPesquisa}
        onChange={(event: { target: { value: string } }) => {
          filtrarGrid(null, event.target.value);
        }}
        size='small'
        fullWidth
      >
        <MenuItem value={'-1'}>Selecione...</MenuItem>
        <MenuItem value={'Ativo'}>Ativo</MenuItem>
        <MenuItem value={'Inativo'}>Inativo</MenuItem>
      </InputDados>
    </Box>
  );
};

export default StatusPesquisar;
