import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Container, IconButton, Typography, FormLabel } from '@mui/material';

import { FONT_SIZE } from '../../utils';

import { blue, grey } from '@mui/material/colors';
import BoyIcon from '@mui/icons-material/Boy';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';

import ContainerPainel from '../../components/container_painel';
import AuthContext from '../../contexts/auth';

const SemPermissao: React.FC = (props) => {
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
    carregarDados();
    return () => {};
  }, []);

  const carregarDados = async () => {
    setLoading(false);
  };

  return (
    <ContainerPainel>
      <Box justifyContent={'center'} display={'flex'} p={1} sx={{ backgroundColor: grey[50] }}>
        <Typography variant='h5' component='h2' gutterBottom>
          SEM PERMISSÃO DE ACESSO AO RECURSO SOLICITADO
        </Typography>
      </Box>
    </ContainerPainel>
  );
};

export default SemPermissao;
