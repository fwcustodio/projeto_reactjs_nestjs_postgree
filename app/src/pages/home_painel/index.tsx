import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Container, IconButton, Typography, FormLabel } from '@mui/material';

import { FONT_SIZE } from '../../utils';

import { blue, grey } from '@mui/material/colors';
import BoyIcon from '@mui/icons-material/Boy';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';

import ContainerPainel from '../../components/container_painel';
import AuthContext from '../../contexts/auth';

const HomePainel: React.FC = (props) => {
  const [loading, setLoading] = useState(true);
  const { User, signInContext, DEV }: { User: any; signInContext: any; DEV: boolean } = useContext(AuthContext) || {
    User: null,
    signInContext: null,
    DEV: false,
  };

  interface Usuario {
    given_name: string;
    name: string;
    // Add other properties here if needed
  }

  useEffect(() => {
    DEV && printarVariaveisAmbiente();
    carregarDados();
    return () => {};
  }, []);

  const printarVariaveisAmbiente = () => {
    console.log('process.env.PORTAL_URL', process.env.PORTAL_URL);
    console.log('process.env', process.env);
    console.log('process.env', JSON.stringify(process.env));
  };

  const carregarDados = async () => {
    if (User) {
      DEV && console.log('UsuarioLogado', JSON.stringify(User));
    } else {
      const UsuarioLogadoAux = { id: '1', nome: 'Usuário Teste', given_name: 'Usuário', email: 'emailteste@gmail.com' };
      //console.log('UsuarioLogadoAux', JSON.stringify(UsuarioLogadoAux));

      signInContext(UsuarioLogadoAux);
    }

    setLoading(false);
  };

  return (
    <ContainerPainel>
      <Box justifyContent={'center'} display={'flex'} p={1} sx={{ backgroundColor: grey[50] }}>
        <Typography variant='h5' component='h2' gutterBottom>
          Página inicial do Painel
        </Typography>
      </Box>
    </ContainerPainel>
  );
};

export default HomePainel;
