import {} from 'react';

import { Box, Button, IconButton, Typography, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FONT_SIZE, MODOS, MENSAGENS } from '../../utils';

interface BotaoAdicionarProps {
  pagina: string;
}

export const BotaoAdicionar: React.FC<BotaoAdicionarProps> = (props) => {
  const { pagina } = props;
  const navigate = useNavigate();

  return (
    <Box>
      <Button
        variant='contained'
        style={{ backgroundColor: '#109fef' }}
        onClick={() => {
          navigate(`${pagina}/${MODOS.CADASTRAR}`);
        }}
        sx={{ marginLeft: 10, marginRight: '30%' }}
      >
        Adicionar
      </Button>
    </Box>
  );
};

export const BotaoSalvar: React.FC<any> = (props?: any) => {
  return (
    <Button variant='contained' style={{ backgroundColor: '#109fef' }} {...props}>
      Salvar
    </Button>
  );
};

export const BotaoEditar: React.FC<any> = (props?: any) => {
  return (
    <Box>
      <Button variant='contained' style={{ backgroundColor: '#109fef' }} {...props}>
        Editar
      </Button>
    </Box>
  );
};

export const BotaoExcluir: React.FC<any> = (props?: any) => {
  return (
    <Button
      variant='contained'
      sx={{
        backgroundColor: 'error.main',
        ':hover': {
          bgcolor: 'error.main',
        },
      }}
      {...props}
    >
      Excluir
    </Button>
  );
};

export const BotaoFechar: React.FC<any> = (props?: any) => {
  const navigate = useNavigate();
  const { modo } = props;

  return (
    <Button
      variant='contained'
      onClick={() => {
        modo == MODOS.VISUALIZAR ? navigate(-1) : confirm(MENSAGENS.SAIR_TELA) && navigate(-1);
      }}
      sx={{
        backgroundColor: 'secondary.main',
        ':hover': {
          bgcolor: 'secondary.main',
        },
      }}
      {...props}
    >
      Fechar
    </Button>
  );
};
