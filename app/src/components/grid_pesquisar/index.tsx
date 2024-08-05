import * as React from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

interface GridPesquisarProps {
  filtrarGrid: (TextoBusca: string) => void; // Adjust the type according to the actual usage
}

const GridPesquisar: React.FC<GridPesquisarProps> = (props) => {
  //const { Link } = props;
  const { filtrarGrid } = props;
  const [Texto, setTexto] = React.useState<string>(''); // Provide a default value of an empty string

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      filtrarGrid(Texto);
    }
  };

  return (
    <Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
      <InputBase
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTexto(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{ ml: 1, flex: 1 }}
        placeholder='Pesquisar'
        inputProps={{ 'aria-label': 'search google maps' }}
        autoFocus={true}
      />
      <IconButton type='button' sx={{ p: '10px' }} aria-label='search' onClick={() => filtrarGrid(Texto)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default GridPesquisar;
